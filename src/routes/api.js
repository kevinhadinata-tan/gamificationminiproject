// kalau bisa kerjain routing dari sistem backend (itu bisa dilihat dari modul yang ada di tabel erdnya)
// =======================================================================================================
const express = require('express');
const sectionController = require('../controllers/sectionController');
const userController = require('../controllers/userController');
const workspaceController = require('../controllers/workspaceController');
const taskController = require('../controllers/taskController');
const rewardController = require('../controllers/rewardController');
const scoreController = require('../controllers/scoreController');

const { validateToken } = require('../middlewares/auth');
const tierController = require('../controllers/tierController');
const historyController = require('../controllers/historyController');
const reviewController = require('../controllers/reviewController');
// contoh testing deploy

function routes () {

    const router = express.Router();

    /* module untuk user
    *
    * untuk user itu bisa create (register), edit/update, 
    * 
    * METHOD : GET, POST & PUT
    */
    router.get('/', function (req, res) {
        res.status('200').send('Welcome to TIM C Backend');
    })

    router.post('/user/registrasi', function (req, res) {
        userController.registrasi(req, res);
    });

    router.post('/user/login', function (req, res) {
        userController.login(req, res);
    });


    router.get('/user/profile', validateToken, function (req, res) {
        userController.profile(req, res);
    });

    router.get('/user/logout', function (req, res) {
        userController.logout(res, req);
    });

    router.put('/user/profile/:userID', validateToken, function (req, res) {
        userController.update(req, res);
    });

    // =======================================================================================================

    /* module untuk workspaces
    * rencananya 1 user itu hanya punya 1 workspace jadi relasi tabel user dan workspace itu one to one
    * 1 workspace ini nanti punya banyak section nya
    * workspacenya hanya menampilkan nama dan detailnya
    * 
    * METHOD: GET, POST
    */
    router.get('/workspace', validateToken, function (req, res) {
        workspaceController.getAllWorkspace(req, res);
    });

    router.post('/workspace', validateToken, function (req, res) {
        workspaceController.create(req, res);
    });

    router.get('/workspace/:workspaceID', validateToken, function (req, res) {
        workspaceController.getWorkspaceByID(req, res);
    });

    router.put('/workspace/:workspaceID', validateToken, function(req, res) {
        workspaceController.update(req, res);
    });

    router.delete('/workspace/:workspaceID', validateToken, function (req, res) {
        workspaceController.delete(req, res);
    });

    // router.put('/workspace/:ID', validateToken, function (req, res) {
    //     workspaceController.update(req, res);
    // });

    // =======================================================================================================


    /* module untuk section
    * 
    * 1 section nanti punya banyak task
    * section akan dihubungkan pada history dan review untuk penampilkan datanya
    * 
    * METHOD: GET, POST
    */

    router.get('/section', validateToken, function (req, res) {
        sectionController.getAllSection(req, res);
    });

    router.post('/section', validateToken, function (req, res) {
        sectionController.create(req, res);
    });

    router.get('/section/:sectionID', validateToken, function (req, res) {
        sectionController.getSectionByID(req, res);
    });

    router.put('/section/:sectionID', validateToken, function(req, res) {
        sectionController.update(req, res);
    });

    router.delete('/section/:sectionID', validateToken, function (req, res) {
        sectionController.delete(req, res);
    });

    // =======================================================================================================

    /* module untuk task
    * 
    * task ini nanti yang menampilkan nama tasknya, Assignee/siswa, waktu task mulai, waktu task selesai,deskripsinya, status, taskStatus(masa berlakunya task), priority
    * 
    * METHOD: GET, POST, DELETE(delete secara booleannya aja dgn penamaan is-> kalau 1 itu berarti ibaratnya sudah kehapus datanya, kalau 0 itu berarti datanya ada)
    */

    router.post('/task', validateToken, function (req, res) {
        taskController.create(req, res);
    });

    router.get('/task', validateToken, function (req, res) {
        taskController.getAllTask(req, res);
    });

    router.put('/task/:taskID', validateToken, function(req, res) {
        taskController.update(req, res);
    });

    router.delete('/task/:taskID', validateToken, function (req, res) {
        taskController.delete(req, res);
    });

    router.get('/task/search', validateToken, function (req, res) {
        taskController.searchTask(req, res);
    });

    router.get('/task/priority', validateToken, function (req, res) {
        taskController.filterPriority(req, res);
    });

    router.post('/task/user/take', validateToken, function (req, res) {
        taskController.childTakeTask(req, res);
    });

    router.put('/task/completed/:taskID', validateToken, function (req, res) {
        taskController.taskCompleted(req, res);
    });

    router.get('/task/all', validateToken, function (req, res) {
        taskController.getAllTaskAnak(req, res);
    });
    
    router.get('/task/:taskID', validateToken, function (req, res) {
        taskController.getTaskByID(req, res);
    });

    // =======================================================================================================

    /*
    * ini api untuk score pada siswa
    */

    router.post('user/point', validateToken, function (req, res) {
        scoreController.getPoint(req, res);
    });

    // =======================================================================================================

    /* module tier/level/badge
    * penentuannya nanti kalau udah buat 1 workspace, si orang tua bisa buat tier/level/badgenya dari workspace nya
    * terus nanti pembagian tiernya mempengaruhi si rewardnya
    * 
    * METHOD: POST, GET
    */

    router.get('/tier/filter', validateToken, function (req, res) {
        tierController.getFilterTier(req, res);
    });

    router.get('/tier', validateToken, function (req, res) {
        tierController.getAllTier(req, res);
    });

    // =======================================================================================================

    /* module untuk review (yang sebelumnya report)
    * 
    * menampilkan data selesainya task dan tidak selesainya task berdasarkan isCompletednya dan taskStatus untuk pengecekan apa task date endnya sudah melewati
    * 
    * 
    *
    */

    /* module untuk reward
    * -> reward itu menambahkannya dari orang tua (insert data reward baru)
    * -> reward bisa dipilih oleh siswanya (insert value where id reward = (selectRewardnya))
    * -> reward juga berdasarkan tier misalkan tiernya itu tier bronze kan maksimal skornya(misalkan 50) jadi si rewardnya itu hanya dapat dipilih oleh siswa
    * 
    * METHOD : GET, POST
    */

    router.get('/user/reward/', function (req, res) {
        rewardController.getAllReward(req, res);
    });
    
    router.get('/user/reward/:rewardID', function (req, res) {
        rewardController.getRewardByID(req, res);
    });

    router.post('/user/reward/', function (req, res) {
        rewardController.create(req, res);
    });

    router.put('/user/reward/:rewardID', function (req, res) {
        rewardController.update(req, res);
    });

    router.get('/user/get/reward', validateToken, function (req, res) {
        rewardController.getRewardUserTaken(req, res);
    });

    router.post('/reward/user/take', validateToken, function (req, res) {
        rewardController.takeRewardByUser(req, res);
    });

    router.delete('/user/reward/:rewardID', validateToken, function (req, res) {
        rewardController.delete(req, res);
    });
    

    // =======================================================================================================


    // module untuk history

    router.get('/user/review', function (req, res) {
        reviewController.getAllReview(req, res);
    });

    router.get('/user/history', function (req, res) {
        historyController.getAllHistory(req, res);
    });

    router.get('/user/score', function (req, res) {
        scoreController.getScore(req, res);
    });

    return router
}

module.exports = routes;