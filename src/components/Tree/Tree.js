import React, { Fragment } from "react";
import File from "../File/File";
import Folder from "../Folder/Folder";

function Tree(props) {
  if (props.data) {
    return (
      <Fragment>
        {props.data.map((currentVal, idx, arr) => {
          if (currentVal.category === "file") {
            return (
              <File
                data={currentVal}
                selectedFolderId={props.selectedFolderId}
                onHover={props.onHover}
                offHover={props.offHover}
                folderEditBtn={props.folderEditBtn}
                addFolder={props.addFolder}
                editName={props.editName}
                pushEnterFunction={props.pushEnterFunction}
                inputBlur={props.inputBlur}
                delete={props.delete}
                moveToUrl={props.moveToUrl}
                copyUrl={props.copyUrl}
                dragStart={props.dragStart}
                dragOver={props.dragOver}
                drop={props.drop}
                dragLeave={props.dragLeave}
                dragEnter={props.dragEnter}
              />
            );
          }
          if (currentVal.category === "folder") {
            return (
              <Folder
                data={currentVal}
                selectedFolderId={props.selectedFolderId}
                onHover={props.onHover}
                offHover={props.offHover}
                folderEditBtn={props.folderEditBtn}
                addFolder={props.addFolder}
                editName={props.editName}
                pushEnterFunction={props.pushEnterFunction}
                inputBlur={props.inputBlur}
                delete={props.delete}
                hideList={props.hideList}
                moveToUrl={props.moveToUrl}
                copyUrl={props.copyUrl}
                currentAddThing={props.currentAddThing}
                openedFolder={props.openedFolder}
                dragStart={props.dragStart}
                dragOver={props.dragOver}
                drop={props.drop}
                dragLeave={props.dragLeave}
                dragEnter={props.dragEnter}
              />
            );
          }
        })}
      </Fragment>
    );
  } else {
    return "";
  }
}

export default Tree;
