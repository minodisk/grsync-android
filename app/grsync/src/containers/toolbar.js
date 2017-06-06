import React, {
  Component
} from 'react'
import {
  connect,
} from 'react-redux'
import ToolbarAndroid from 'ToolbarAndroid'

import {
  configure,
  reload,
  selectAll,
  unselectAll,
  sync,
} from '../actions'

class Toolbar extends Component {
  render() {
    const {
      configure,
      reload,
      selectAll,
      unselectAll,
      sync,
      selectedFiles,
    } = this.props
    const actions = [
      {
        title: 'Configuration',
        action: configure,
      },
      {
        title: "Reload Photos",
        action: reload,
      },
      {
        title: "Select All Photos",
        action: selectAll,
      },
      {
        title: "Unselect All Photos",
        action: unselectAll,
      },
      {
        title: "Sync Selected Photos",
        action: () => sync(selectedFiles),
      },
    ]
    return (
      <ToolbarAndroid
        title="GRSync"
        actions={actions}
        titleColor="#333333"
        style={{
          backgroundColor: '#FFFFFF',
          height: 48,
          shadowOffset:{
            width: 10,
            height: 10,
          },
          elevation: 2,
        }}
        onActionSelected={(pos) => actions[pos].action()}
      />
    )
  }
}

export default connect((state) => {
  return {
    selectedFiles: state.files.filter((file) => file.selected),
  }
}, (dispatch) => {
  return {
    configure: () => dispatch(configure()),
    reload: () => dispatch(reload()),
    selectAll: () => dispatch(selectAll()),
    unselectAll: () => dispatch(unselectAll()),
    sync: (selectedFiles) => dispatch(sync(selectedFiles)),
  }
})(Toolbar)
