"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {

  /**
   * Authenticate user with username, password.
   * 
   * Throws UnauthorizedError is user not found or wrong password.
   * 
   * @param {string} username - unique username to self identify
   * @param {string} password - password to login account
   * @returns {Promise<string>} JSON  
   * [{ username, first_name, last_name, email, is_admin }]
   */
   static async authenticate(username, password) {
        // try to find the user first
        const result = await db.query(
            `SELECT username,
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
        [username],
        );

        const user = result.rows[0];

        if(user){
            const isValid = await bcrypt.compare(password, user.password);

            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid/ username/password");
   }

   /**
    * Register user with data.
    * 
    * Throws BadRequestError on duplicates.
    * 
    * @param {*} param0 
    * @returns {Array}  [{ username, firstName, lastName, email, isAdmin }]
    */
   static async register(
    { username, password, firstName, lastName, email, isAdmin }) {

        const duplicateCheck = await db.query(
                `SELECT username
                FROM users
                WHERE username = $1`,
            [username],
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
                `INSERT INTO users
                (username,
                password,
                first_name,
                last_name,
                email,
                is_admin)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING username, 
                        first_name AS "firstName", 
                        last_name AS "lastName", 
                        email, 
                        is_admin AS "isAdmin"`,
            [
                username,
                hashedPassword,
                firstName,
                lastName,
                email,
                isAdmin,
            ],
        );

        const user = result.rows[0];   
        return user;
  }

  /**
   * Find all users  
   * 
   * @returns {Promise<string>} JSON  
   */
  static async findAll() {
    const users = await db.query(
          `SELECT username,
              first_name AS "firstName",
              CONCAT (first_name, ' ', last_name) AS "name",
              email,
              is_admin AS "isAdmin"
          FROM users
          ORDER BY username`,
    );

    return users.rows;
  }

  /**
   * Function grabs username and retrieves account 
   * @param {string} username - unique username to self identify
   * @returns {Promise<string>} JSON 
   * [{ username, first_name, last_name, email, is_admin }]
   */
  static async get(username) {
    const userRes = await db.query(
        `SELECT username,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                is_admin AS "isAdmin"
         FROM users
         WHERE username = $1`,
      [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    const userRecipes = await db.query(
          `SELECT recipe_id
           FROM users_recipes 
           WHERE username = $1`, [username]);

    const userIngredienets = await db.query(
    `SELECT ingredient_id
      FROM users_groceries 
      WHERE username = $1`, [username]);


    user.recipes = userRecipes.rows.map(u => u.recipe_id); 
    user.groceries = userIngredienets.rows.map(u => u.ingredient_id); 

    return user; 
  }

    /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email, isAdmin }
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

    static async update(username, data) {
      if (data.password) {
        data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
      }

      const { setCols, values } = sqlForPartialUpdate(
          data,
          {
            firstName: "first_name",
            lastName: "last_name",
            isAdmin: "is_admin",
          });
      const usernameVarIdx = "$" + (values.length + 1);

      const querySql = `UPDATE users 
                        SET ${setCols} 
                        WHERE username = ${usernameVarIdx} 
                        RETURNING username,
                                  first_name AS "firstName",
                                  last_name AS "lastName",
                                  email,
                                  is_admin AS "isAdmin"`;
      const result = await db.query(querySql, [...values, username]);
      const user = result.rows[0];

      if (!user) throw new NotFoundError(`No user: ${username}`);

      delete user.password;
      return user;
  }


  /**
   * Delete given user from database; returns undefined.
   * @param {string} username 
   */
  static async remove(username) {
    let result = await db.query(
        `DELETE
        FROM users
        WHERE username = $1
        RETURNING username`,
        [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

  }

  /**
   * User adds a recipe to their list of favorites, makes a db relationship
   * @param {string} username 
   * @param {Number} recipeId 
   */
  static async addRecipe(username, recipeId) {
    const checkRecipe = await db.query(
      `SELECT id
       FROM recipes
        WHERE id = $1`, [recipeId]);

    const recipe = checkRecipe.rows[0];

    if (!recipe) throw new NotFoundError(`No recipe: ${recipeId}`); 

    const checkUser = await db.query(
      `SELECT username
       FROM users
       WHERE username = $1`, [username]);

    const user = checkUser.rows[0];

    if (!user) throw new NotFoundError(`No username: ${username}`);

    await db.query(
      `INSERT INTO user_recipes (username, recipe_id)
       VALUES ($1, $2)`,
    [username, recipeId]);
  }

  /**
   * User adds a grocery ingredient list, makes a db relationship
   * @param {string} username 
   * @param {Number} ingredientId 
   */
  static async addGrocery(username, ingredientId) {
    const checkIngredient = await db.query(
      `SELECT id
       FROM ingredients
        WHERE id = $1`, [ingredientId]);

    const ingredient = checkIngredient.rows[0];

    if (!ingredient) throw new NotFoundError(`No ingredient: ${ingredientId}`); 

    const checkUser = await db.query(
      `SELECT username
       FROM users
       WHERE username = $1`, [username]);

    const user = checkUser.rows[0];

    if (!user) throw new NotFoundError(`No username: ${username}`);

    await db.query(
      `INSERT INTO user_groceries (username, ingredient_id)
       VALUES ($1, $2)`,
    [username, ingredientId]);
  }
}

module.exports = User;
