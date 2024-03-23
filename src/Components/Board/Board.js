import React, { useState } from "react";
import { Plus, Slash } from "react-feather";

import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";

import "./Board.css";
import CardInfo from "../Card/CardInfo/CardInfo";
import NewCard from "../NewCard/NewCard";

function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
        <div
          className="board_header_title_more"
          onClick={() => setShowDropdown(true)}
        >
          
          {/* {showDropdown && (
            <Dropdown
              class="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeBoard()}>Delete Board</p>
            </Dropdown>
          )} */}
          <Plus onClick={()=>setShowModal(true)}/>
          {showModal && (
        <NewCard
        onClose={() => setShowModal(false)}
        card={props.board?.cards}
        boardTitle={props.title}
        addCard={props.addCard}
      />
      )}
          {/* <Editable
          text={}
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        /> */}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards.length === 0 && 
        <div className="board_cards_no_issues">
          <Slash style={{height:'100px', width:'100px'}}/>
          <p>NO ISSUES FOUND</p>
        </div>}
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
}

export default Board;