import React, { useState, useEffect } from 'react'
import {
  Button,
  Header,
  Icon,
  Modal,
  Input,
  TextArea,
  Grid,
  Divider,
  Segment,
  Label,
} from 'semantic-ui-react'
import {
  addUserToTeam,
  deleteUserFromTeam,
  getUsersOfTeam,
  updateTeam,
} from '../../../utils/APIRequests/TeamRequest.jsx'
import { useStore } from '../../../store/store.jsx'
import { getAllUsers } from '../../../utils/APIRequests/UserRequests.jsx'
import createNotification from '../../../utils/Notifications.jsx'
import styles from './EditModal.scss'
import { getSavedUserFromLocalStorage } from '../../../utils/LocalStorageUtils.jsx'

const EditModal = ({ trigger, name, description = '', id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newName, setNewName] = useState(name)
  const [newDescription, setNewDescription] = useState(description)
  const [members, setMembers] = useState([])
  const [isMembersLoading, setIsMembersLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [newUsers, setNewUsers] = useState([])
  const [isUsersLoading, setIsUsersLoading] = useState(true)
  const [isNewNameEmpty, setIsNewNameEmpty] = useState(false)
  const [state] = useStore()
  const { teams, setTeams } = state
  const errorNotification = createNotification('error')

  const handleOpen = (e) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const handleClose = (e) => {
    e.preventDefault()
    setIsModalOpen(false)
    setNewName(name)
    setNewDescription(description)
  }

  const submitEditingCallback = (res) => {
    setTeams(
      teams.map((team) =>
        team.id === id
          ? { ...team, name: newName, description: newDescription }
          : team
      )
    )
  }

  const submitEditing = (e) => {
    if (!newName) {
      setIsNewNameEmpty(true)
      errorNotification("Team name can't be empty")
      return
    }
    updateTeam(
      id,
      { name: newName, description: newDescription },
      submitEditingCallback
    )
    handleClose(e)
  }
  const getMembersCallback = (data) => {
    setMembers(data)
    setIsMembersLoading(false)
  }
  const getUsersCallback = (data) => {
    setUsers(data)
    setIsUsersLoading(false)
  }
  const deleteUserCallback = (userId) => () => {
    setMembers(members.filter((member) => member.id !== userId))
    setTeams(
      teams.map((team) =>
        team.id === id ? { ...team, memberCount: team.memberCount - 1 } : team
      )
    )
  }
  const handleDeleteMember = (userId) => {
    deleteUserFromTeam(id, userId, deleteUserCallback(userId))
  }
  const addUserCallback = (userId) => () => {
    const newMember = users.filter((user) => user.id === userId)
    setMembers([...members, ...newMember])
    setTeams(
      teams.map((team) =>
        team.id === id ? { ...team, memberCount: team.memberCount + 1 } : team
      )
    )
  }
  const handleAddMember = (userId) => {
    addUserToTeam(id, userId, addUserCallback(userId))
  }
  const handleNewNameOnChange = (e) => {
    setNewName(e.target.value)
    setIsNewNameEmpty(false)
    if (!e.target.value) {
      setIsNewNameEmpty(true)
    }
  }
  const isUserCreatorOfTeam = (userId) => {
    const team = teams.find((team) => team.id === id)
    return team.creator.id === userId
  }

  useEffect(() => {
    getUsersOfTeam(id, getMembersCallback)
    getAllUsers(getUsersCallback)
  }, [])
  useEffect(() => {
    setNewUsers(
      users.filter((user) => !members.some((member) => member.id === user.id))
    )
  }, [users, members])

  return (
    <Modal
      onClick={(e) => e.preventDefault()}
      trigger={<span onClick={handleOpen}>{trigger}</span>}
      open={isModalOpen}
      onClose={handleClose}
      size="small"
    >
      <Header icon="edit" content="Edit team" />
      <Modal.Content>
        <Segment basic>
          <Grid columns={2} relaxed={'very'} stackable>
            <Grid.Column>
              <h3>Team name:</h3>
              <Input
                error={isNewNameEmpty}
                placeholder={'Team name'}
                value={newName}
                onChange={handleNewNameOnChange}
              />
              <h3>Team description:</h3>
              <TextArea
                className={styles.TextArea}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </Grid.Column>

            <Grid.Column>
              Members:
              <Segment basic loading={isMembersLoading}>
                {members.map((user) => (
                  <Button
                    key={user.id}
                    animated
                    className={styles.userButton}
                    onClick={() => handleDeleteMember(user.id)}
                    disabled={isUserCreatorOfTeam(user.id)}
                  >
                    <Button.Content visible>{user.username}</Button.Content>
                    <Button.Content hidden>Delete</Button.Content>
                  </Button>
                ))}
              </Segment>
              Invite user:
              <Segment basic loading={isUsersLoading}>
                {newUsers.map((user) => (
                  <Button
                    key={user.id}
                    animated
                    className={styles.userButton}
                    onClick={() => handleAddMember(user.id)}
                  >
                    <Button.Content visible>{user.username}</Button.Content>
                    <Button.Content hidden color={'green'}>
                      Invite
                    </Button.Content>
                  </Button>
                ))}
              </Segment>
            </Grid.Column>
          </Grid>
          <Divider fitted vertical>
            {' '}
            <Icon name={'pencil'} />{' '}
          </Divider>
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={submitEditing}>
          <Icon name="checkmark" /> Submit
        </Button>
        <Button color="red" onClick={handleClose} inverted>
          <Icon name="delete" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditModal
