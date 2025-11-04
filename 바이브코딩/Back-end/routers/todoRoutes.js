const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 모든 할일 조회
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: '할일 목록을 불러오는데 실패했습니다.', error: err.message });
  }
});

// 할일 생성
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = new Todo({ title });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: '할일 생성에 실패했습니다.', error: err.message });
  }
});

// 특정 할일 조회
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: '할일을 찾을 수 없습니다.' });
    }
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: '할일 조회에 실패했습니다.', error: err.message });
  }
});

// 할일 수정
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title },
      { new: true, runValidators: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: '할일을 찾을 수 없습니다.' });
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: '할일 수정에 실패했습니다.', error: err.message });
  }
});

// 할일 삭제
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: '할일을 찾을 수 없습니다.' });
    }
    res.json({ message: '할일이 삭제되었습니다.', todo: deletedTodo });
  } catch (err) {
    res.status(400).json({ message: '할일 삭제에 실패했습니다.', error: err.message });
  }
});

module.exports = router;

