import React, { useState, useContext } from 'react';
import { Button, Header, Icon, Modal, Input, TextArea } from 'semantic-ui-react';
import {updateTeam} from '../../../utils/APIRequests/TeamRequest.jsx';
import {useStore} from '../../../store/store.jsx';
import styles from './EditModal.scss';

const EditModal = ({trigger, name, description='', id}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [state]  = useStore();

  const handleOpen = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setNewName(name);
    setNewDescription(description);
  };

  const submitEditingCallback = (res) => {
    const {teams, setTeams} = state;
    setTeams(teams.map( (team) => team.id === id ? {...team, name: newName, description: newDescription} : team));
  };

  const submitEditing = (e) => {
    updateTeam(id, {name: newName, description: newDescription}, submitEditingCallback);
    handleClose(e);
  };

  return (
    <Modal
      onClick={e => e.preventDefault()}
      trigger={<span onClick={handleOpen}>{trigger}</span>}
      open={isModalOpen}
      onClose={handleClose}
      size='mini'
    >
      <Header icon='edit' content='Edit team' />
      <Modal.Content>
        <h3>Team name:</h3>
        <Input value={newName} onChange={e => setNewName(e.target.value)} />
        <h3>Team description:</h3>
        <TextArea className={styles.TextArea} value={newDescription} onChange={e => setNewDescription(e.target.value)}/>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={submitEditing}>
          <Icon name='checkmark' /> Submit
        </Button>
        <Button color='red' onClick={handleClose} inverted>
          <Icon name='delete' /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
} ;

export default EditModal;