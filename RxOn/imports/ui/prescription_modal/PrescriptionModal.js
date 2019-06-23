import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'antd/lib/modal'
import 'antd/lib/modal/style/css'
import { connectModal } from 'redux-modal'

class AntdModal extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    handleHide: PropTypes.func.isRequired
  };

  render() {
    const { show, handleHide, message } = this.props

    return (
      
      <Modal title="Prescription" visible={show} onOk={handleHide} onCancel={handleHide}>
        <p>
          { message }
        </p>
      </Modal>
    );
  }
}

export default connectModal({ name: 'add Prescription', destroyOnHide: true })(AntdModal)
