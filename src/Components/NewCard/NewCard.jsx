import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./NewCard.css";
import { Bookmark, Calendar, CheckSquare, Circle, Flag, HelpCircle, List, Trash, Type, Zap } from "react-feather";
import Editable from "../Editabled/Editable";

const NewCard = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('Epic');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('0');
  const [tasks, setTasks] = useState([]);

  const handleSubmit = () => {
    const newCard = {
      id: 'CN-'+(Math.floor(Math.random() * 9000) + 1000),
      title,
      description,
      date,
      type,
      priority,
      status,
      tasks,
    };
    // props.addCard([...props.cards, newCard]);
    console.log('status in newcard', status)
    props.addCard(status, newCard)
    resetForm();
    console.log('newcard', newCard)
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setType('Epic');
    setPriority('Low');
    setStatus('0');
    setTasks([]);
    props.onClose();
  };

  const updateTask = (id, value) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: value } : task
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = (value) => {
    const newTask = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setTasks([...tasks, newTask]);
  };
  const calculatePercent = () => {
    if (!tasks?.length) return 0;
    const completed = tasks?.filter((item) => item.completed)?.length;
    return (completed / tasks?.length) * 100;
  };

  return (
    <Modal onClose={resetForm}>
      <div className="container">
        <div className="title">
          <h2>Create Issue</h2>
          <button className="create-button" onClick={handleSubmit}>Submit</button>
        </div>
        <div className="row">
          <div className="row_name">
            <Type />
            <h3>Title</h3>
          </div>
          <input type="text" className="row_input_title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Write the title"/>
        </div>
        <div className="row">
          <div className="row_name">
            <List />
            <h3>Description</h3>
          </div>
          <input type="text" className="row_input_description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add a description"/>
        </div>
        <div className="option_row">
          <div className="row">
            <div className="row_name">
              <Calendar />
              <h3>Date</h3>
            </div>
            <input
              type="date"
              className="row_input"
              value={date}
              min={new Date().toISOString().substr(0, 10)}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="row">
            <div className="row_name">
              <HelpCircle />
              <h3>Type</h3>
            </div>
            <select className="row_input" value={type} onChange={(e) => setType(e.target.value)}>
              <option content={<Zap/>} value="Epic">Epic</option>
              <option value="Task">Task</option>
              <option value="Story">Story</option>
              <option value="Bug">Bug</option>
            </select>
          </div>
        </div>
        <div className="option_row">
          <div className="row">
            <div className="row_name">
              <Flag />
              <h3>Priority</h3>
            </div>
            <select className="row_input" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="row">
            <div className="row_name">
              <Circle />
              <h3>Status</h3>
            </div>
            <select className="row_input" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="0">To Do</option>
              <option value="1">In Progress</option>
              <option value="2">Done</option>
            </select>
          </div>
        </div>
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <CheckSquare />
            <p>Tasks</p>
          </div>
          <div className="cardinfo_box_progress-bar">
            <div
              className="cardinfo_box_progress"
              style={{
                width: `${calculatePercent()}%`,
                backgroundColor: calculatePercent() === 100 ? "limegreen" : "",
              }}
            />
          </div>
          <div className="cardinfo_box_task_list">
            {tasks.map((item) => (
              <div key={item.id} className="cardinfo_box_task_checkbox">
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) => updateTask(item.id, event.target.checked)}
                />
                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                <Trash onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>
          <Editable
            text={"Add a Task"}
            placeholder="Enter task"
            onSubmit={addTask}
          />
        </div>
      </div>
    </Modal>
  );
};

export default NewCard;
