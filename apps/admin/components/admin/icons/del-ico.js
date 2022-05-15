import React from 'react';
import { Fn } from '@abule-common/components';

const {
  popPrompt,
} = Fn;
const DeleteIcon = ({ deletehandler, identifier = '' }) => {
  let text = '';

  const handleChange = (e) => {
    text = e.target.value;
  };

  return (
    <svg
      width={15}
      height={15}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer' }}
      onClick={() => popPrompt({
        warning: false,
        title: 'Warning',
        message: (
          <div className="adminApp_deletePopup">
            <p>{`Are you sure you want to delete this ${identifier}`}</p>
            <p className="secondaryText">confirm by typing the word 'DELETE' in a text box below</p>
            <div className="adminApp_deleteInput">
              <label className="adminApp_label" htmlFor="adminAction" />
              <input
                className="adminApp_input"
                id="adminAction"
                name="adminAction"
                onChange={handleChange}
                type="text"
                placeholder="Type Here"
              />
            </div>
          </div>
        ),
        confirmButton: {
          label: 'Confirm',
          onClick: async (closer) => {
            if (text.toUpperCase() === 'DELETE') {
              await deletehandler();
              closer();
            } else {
              closer();
            }
          },
        },
        cancelButton: {
          label: 'Cancel',
        },
      })}
    >
      <path
        d="M7.478 0c.82 0 1.609.267 2.2.745.59.477.937 1.129.967 1.817l.002.098h3.422c.229 0 .449.074.614.207a.698.698 0 0 1 .272.507c.01.192-.07.38-.221.523a.956.956 0 0 1-.592.25l-.073.002h-.592l-.825 9.179c-.04.454-.285.88-.683 1.19-.399.31-.922.482-1.465.482H4.452a2.396 2.396 0 0 1-1.465-.482c-.398-.31-.642-.736-.683-1.19l-.826-9.18h-.59a.987.987 0 0 1-.602-.196.707.707 0 0 1-.283-.487L0 3.405c0-.188.084-.368.235-.505a.96.96 0 0 1 .58-.238l.072-.002H4.31C4.31 1.256 5.605.106 7.247.007l.115-.005L7.478 0ZM9.38 5.532a.706.706 0 0 0-.424.137.508.508 0 0 0-.206.34l-.003.055v5.106l.003.055a.507.507 0 0 0 .205.342.706.706 0 0 0 .425.137c.158 0 .31-.049.426-.137a.507.507 0 0 0 .205-.342l.003-.055V6.064l-.003-.055a.508.508 0 0 0-.206-.34.706.706 0 0 0-.425-.137Zm-3.802 0a.707.707 0 0 0-.425.137.508.508 0 0 0-.206.34l-.003.055v5.106l.003.055a.508.508 0 0 0 .205.342.706.706 0 0 0 .426.137c.157 0 .309-.049.426-.137a.508.508 0 0 0 .205-.342l.003-.055V6.064l-.003-.055a.508.508 0 0 0-.206-.34.707.707 0 0 0-.425-.137Zm1.986-4.04-.085-.003c-.355 0-.697.114-.955.318a1.104 1.104 0 0 0-.437.781l-.002.072h2.788c0-.298-.135-.585-.378-.802a1.518 1.518 0 0 0-.93-.367Z"
        fill="#FA1C1C"
      />
    </svg>
  );
};

export default DeleteIcon;
