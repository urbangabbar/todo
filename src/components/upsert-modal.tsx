import Modal from 'react-modal';

export const UpsertModal = ({modalIsOpen}:{modalIsOpen: boolean})=>{
    return(<Modal
        isOpen={modalIsOpen}
        contentLabel="Example Modal"
      >
        <h2 >Hello</h2>
        <button>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>)
}