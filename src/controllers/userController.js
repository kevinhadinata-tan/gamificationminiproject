const UserModel = require('../models/UserModel');
const Password = require("../libraries/password");
const { nanoid } = require('nanoid');
const Token = require('../libraries/token');

class UsersController {
    constructor(users) {
        this._userModel = users;
    }

    async registrasi(req, res) {
        try {
            const {
                firstname,
                lastname, 
                username, 
                password, 
                email, 
                roleid
            } = req.body;
            const userModel = UserModel();
            const id = nanoid();

            // ini kondisi jika role = Anak
            if (roleid == '2') {
              const data = await userModel.create({
                  ID: id,
                  firstname,
                  lastname,
                  username,
                  password: Password.makePassword(password),
                  email,
                  roleID: roleid,
                  score: 0,
                  tierID: '1'
              });

              // tierID nya 1 soalnya kalau migrate di setiap anggota nanti tier id nya beda-beda

              return res.status(201).send({
                  message: 'success create user Anak',
                  data,
              });
            }

            // ini kondisi jika role = Orang Tua
            if (roleid == '1') {
              const data = await userModel.create({
                  ID: id,
                  firstname,
                  lastname,
                  username,
                  password: Password.makePassword(password),
                  email,
                  roleID: roleid,
              });

              return res.status(201).send({
                  message: 'success create user Orang Tua',
                  data,
              });
            }

            return res.status(404).send({
                message: 'failed find user',
                data: error.toString()
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed create user',
                data: error.toString()
            });
        }
    }

    async login (req, res) {
        try {
            const userModel = UserModel();
            const data = await userModel.findOne({
              where: {
                username: req.body.username,
              }
            });

            if (data) {
              if (Password.matchPassword(req.body.password, data.password)) {
                const token = Token.sign({
                   ID: data.ID,
                   firstname: data.firstname,
                   lastname: data.lastname,
                   username: data.username,
                   password: data.password,
                   email: data.email,
                   role: data.roleid
                });

                return res.status(200).send({
                  message: 'success login',
                  data: {
                    id: data.ID,
                    email: data.email,
                    accessToken: token,
                  }
                });
              }
            }

            return res.status(403).send({
                message: 'Username and Password is failed',
                data: {},
            });
        } catch (error) {
            return res.status(500).send({
              message: 'Failed to connect database',
              data: {},
          });
        }
    }

    async profile (req, res) {
      try {
        const userModel = UserModel();
        const user = req.user;

        const data = await userModel.findOne({
          where: {
            ID: user.ID,
          },
          attributes: {
            exclude: ['password']
          }
        });

        return res.status(200).send({
          message: 'success fetch user profile',
          data
        });
      } catch (error) {
        return res.status(500).send({
          message: 'Failed get user profile',
          data: {}
        });
      }
    }

    async update(req, res) {
      try {
          const id = req.params.userID;
          const data = req.body;
          const model = UserModel();

          const update = await model.update({
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              password: Password.makePassword(data.password)
          }, {
              where: {
                  ID: id,
              }
          });

          return res.status(200).send({
              message: 'success update profile',
              data: update,
          });
      } catch (error) {
          return res.status(500).send({
              message: 'failed update profile',
              data: {},
          });
      }
  }
}

module.exports = new UsersController();
