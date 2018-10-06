'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Extra", deps: []
 * createTable "Sabor", deps: []
 * createTable "Tamanho", deps: []
 * createTable "Pizza", deps: [Tamanho, Sabor]
 * createTable "PizzaExtra", deps: [Extra, Pizza]
 *
 **/

var info = {
    "revision": 1,
    "name": "db",
    "created": "2018-10-05T03:20:28.183Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Extra",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "nome": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "valor": {
                    "type": Sequelize.DECIMAL,
                    "allowNull": true
                },
                "tempo": {
                    "type": Sequelize.INTEGER,
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Sabor",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "nome": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "valor": {
                    "type": Sequelize.DECIMAL,
                    "allowNull": true
                },
                "tempo": {
                    "type": Sequelize.INTEGER,
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Tamanho",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "nome": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "valor": {
                    "type": Sequelize.DECIMAL,
                    "allowNull": false
                },
                "tempo": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Pizza",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "valor": {
                    "type": Sequelize.DECIMAL,
                    "allowNull": true
                },
                "tempo": {
                    "type": Sequelize.INTEGER,
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "TamanhoId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Tamanho",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "SaborId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Sabor",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "PizzaExtra",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "ExtraId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Extra",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "PizzaId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Pizza",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
