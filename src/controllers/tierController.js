const RewardModel = require('../models/RewardModel');
const TierModel = require('../models/TierModel');

class TierController {
    /* notes: 
    * - nambah point berdasarkan tanggal submit
    * - tambah atau kurang bergantung pada jarak tanggalnya
    *
    * 
    * 
    * source:
    * exports.getBestSellerItems = () => SaleItem.findAll({
    *   attributes: ['itemId', [sequelize.fn('sum', sequelize.col('amount')), 'total']],
    *   group : ['SaleItem.itemId'],
    *   raw: true,
    *   order: sequelize.literal('total DESC')
    * });
    * 
    * SELECT "itemId", sum("amount") AS "total" FROM "SaleItems" AS "SaleItem" GROUP BY "SaleItem"."itemId" ORDER BY total DESC;
    */ 

    async setPoint (req, res) {
        
    }

    async getAllTier (req, res) {
        try {
            const tierModel = TierModel();
            const rewardModel = RewardModel();

            tierModel.hasMany(rewardModel, {
                as: 'Reward', foreignKey: 'tierID'
            });

            const data = await tierModel.findAll({
                include: [
                    {
                        model: rewardModel,
                        as: 'Reward'
                    }
                ]
            });

            res.status(200).send({
                message: 'success fetch all tier',
                data,
            });
        } catch (error) {
            res.status(500).send({
                message: 'failed fetch all tier',
                data: {},
            });
        }
    }

    async getFilterTier(req, res) {
        try {
            const keyword = req.query.b;
            const tierModel = TierModel();
            const rewardModel = RewardModel();

            rewardModel.belongsTo(tierModel, {
                as: 'Tier', foreignKey: 'tierID'
            });

            console.log(keyword);
            
            const data = await rewardModel.findOne(
                {
                    include: [
                        {
                            model: tierModel,
                            as: 'Tier',
                            where: {
                                tierName: keyword
                            }
                        }
                    ]
                });

            res.status(200).send({
                message: 'success filter tier for reward',
                data,
            });
        } catch (error) {
            res.status(500).send({
                message: 'failed filter tier for reward',
                data: error,
            });
        }
    }

}

module.exports = new TierController();