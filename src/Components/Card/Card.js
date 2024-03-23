import React, { useState } from "react";
import { Bookmark, CheckSquare, Circle, Clock, Flag, MoreHorizontal, Zap } from "react-feather";

import Dropdown from "../Dropdown/Dropdown";

import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";

function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { id, title, date, tasks, labels, description, type, priority } = props.card;
  console.log('card', props.card)
  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (!date) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Aprl",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + " " + month;
  };
  const typeIcon = (type) => {
    if(type==='Epic'){
      return <Zap/>
    }
    else if(type==='Task'){
      return <CheckSquare/>
    }
    else if(type==='Story'){
      return <Bookmark/>
    }
    else if(type==='Bug'){
      return <div className="bug_square"><Circle/></div>
    }
  }
  const priorityColor = priority==='Low' ? 'blue' : (priority==='Medium' ? 'yellow' : 'red')

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
        onClick={() => setShowModal(true)}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {/* {labels?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </label>
            ))}HIIIIIIIIII */}
            {typeIcon(type)} {id}
          </div>
          <div
            className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
            onMouseLeave={(event) => {
              event.stopPropagation();
              setShowDropdown(false);
            }}
          >
                        <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board_dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => props.removeCard(props.boardId, id)}>
                  Delete Card
                </p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">{title}</div>
        {/* <div className="card_description">{description}</div> */}
        <div className="card_footer">
        {priority && <p className={`card_footer_item_priority ${priorityColor}`}><Flag/></p>}
          {date && (
            <p className="card_footer_item">
              <Clock className="card_footer_icon" />
              {formatDate(date)}
            </p>
          )}
          {tasks && tasks?.length > 0 && (
            <p className="card_footer_item">
              <CheckSquare className="card_footer_icon" />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;