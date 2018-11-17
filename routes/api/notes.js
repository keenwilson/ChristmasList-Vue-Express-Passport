const router = require('express').Router(); // eslint-disable-line new-cap
const noteController = require('../../controllers/note');

router.get('/', noteController.findAll);
router.get('/:id', noteController.findOne);
router.post('/', noteController.create);
router.put('/:id', noteController.update);
router.delete('/:id', noteController.delete);

module.exports = router;
