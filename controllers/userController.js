const { User, Role } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const cryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
}

module.exports = {
    register: async (req,res) => {
        try {
            
            const { name, email, password, phone, role_id } = req.body
            const hash = await cryptPassword(password);
            const data = await User.create({
                name, 
                email, 
                password: hash, 
                phone,
                role_id
            });

            console.log(req.body)

            return res.status(200).json({
                data,
                message: "success"
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({
                email
            })

            if(user) {
                if(bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign({
                        id: user.id
                    },
                    'secret_key',{
                        expiresIn: '1h'
                    })

                    return res.status(200).json({
                        token
                    })
                }

            }

            return res.status(404).json({
                message: "user not found"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error
            })
        }
    },
    getProfile: async (_, res) => {
        try {
            const id = res.user.id;

            const user = await User.findOne({
                include: {
                    model : Role,
                    as : 'role'
                },
                id
            })

            return res.status(200).json({
                data: user,
                message: "ok"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error
            })
        }
    }
}