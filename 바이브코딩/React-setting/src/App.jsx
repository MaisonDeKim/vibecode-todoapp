import { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 할일 목록 불러오기
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError('할일 목록을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 할일 추가
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) {
      alert('할일을 입력해주세요.');
      return;
    }

    try {
      const newTodo = await createTodo(newTodoTitle);
      setTodos([newTodo, ...todos]);
      setNewTodoTitle('');
    } catch (err) {
      setError('할일 추가에 실패했습니다.');
      console.error(err);
    }
  };

  // 수정 모드 시작
  const handleStartEdit = (todo) => {
    setEditingId(todo._id);
    setEditingTitle(todo.title);
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  // 할일 수정
  const handleUpdateTodo = async (id) => {
    if (!editingTitle.trim()) {
      alert('할일을 입력해주세요.');
      return;
    }

    try {
      const updatedTodo = await updateTodo(id, editingTitle);
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      setEditingId(null);
      setEditingTitle('');
    } catch (err) {
      setError('할일 수정에 실패했습니다.');
      console.error(err);
    }
  };

  // 할일 삭제
  const handleDeleteTodo = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError('할일 삭제에 실패했습니다.');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">📝 할일 관리</h1>

        {/* 할일 추가 폼 */}
        <form onSubmit={handleAddTodo} className="add-form">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="새로운 할일을 입력하세요..."
            className="input"
          />
          <button type="submit" className="btn btn-add">
            추가
          </button>
        </form>

        {/* 에러 메시지 */}
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)} className="error-close">
              ✕
            </button>
          </div>
        )}

        {/* 로딩 상태 */}
        {loading ? (
          <div className="loading">로딩 중...</div>
        ) : (
          /* 할일 목록 */
          <div className="todo-list">
            {todos.length === 0 ? (
              <div className="empty-state">
                할일이 없습니다. 새로운 할일을 추가해보세요! 🎉
              </div>
            ) : (
              todos.map((todo) => (
                <div key={todo._id} className="todo-item">
                  {editingId === todo._id ? (
                    // 수정 모드
                    <div className="edit-mode">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="input edit-input"
                        autoFocus
                      />
                      <div className="edit-buttons">
                        <button
                          onClick={() => handleUpdateTodo(todo._id)}
                          className="btn btn-save"
                        >
                          저장
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="btn btn-cancel"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    // 일반 모드
                    <>
                      <div className="todo-content">
                        <span className="todo-title">{todo.title}</span>
                        <span className="todo-date">
                          {new Date(todo.createdAt).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="todo-actions">
                        <button
                          onClick={() => handleStartEdit(todo)}
                          className="btn btn-edit"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeleteTodo(todo._id)}
                          className="btn btn-delete"
                        >
                          삭제
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
