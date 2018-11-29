import React from 'react';
import DialogListItem from './DialogListItem/index';
import styles from './styles.css';
import {Redirect} from "react-router-dom";

class DialogsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogs: this.props.dialogs,
            dialogToOpen: false,
        };
    }

    openDialog(userID) {
        this.setState({dialogToOpen: userID});
    }

    render() {
        if (this.state.dialogToOpen) {
            // TODO: редиректить на диалог с конкретным пользователем
            return <Redirect to='/im' />;
        }
        console.log(this.state.dialogs);
        return (
            <div className={styles.dialogs_list}>
                {this.state.dialogs.map( (item, pos) => {
                return <DialogListItem
                    avatarURL={item.avatarURL}
                    fullName={item.fullName}
                    lastMessagePreview={item.lastMessagePreview}
                    userID={item.userID}
                    clickCallback={() => this.openDialog.bind(this)}
                    key={pos}
                />
            })}
            </div>
        );
    }
}

export default DialogsList;
