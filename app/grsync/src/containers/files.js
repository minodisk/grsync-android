import React, {
  Component,
} from 'react'
import {
  connect,
} from 'react-redux'
import {
  ActivityIndicator,
  View,
} from 'react-native'

import {
  selectedChanged,
} from '../actions'
import {
  TileList,
} from '../components'
import {
  File,
} from '../models'

class Files extends Component {
  render() {
    const {files, onSelectedChanged} = this.props

    const tiles = {}
    const sorted = files.sort(File.sortDescOnDate)
    sorted.forEach((file) => {
      const date = file.date
      const section = date.toDateString()
      if (tiles[section] == null) {
        tiles[section] = []
      }
      tiles[section].push({
        date: file.date,
        id: file.id,
        url: file.view(),
        selected: file.selected,
        // label: file.ext(),
        label: file.name,
      })
    })

    return (
      <TileList
        size={100}
        margin={2}
        data={tiles}
        onSelectedChanged={this.props.onSelectedChanged}
      />
    )
  }
}

export default connect((state) => {
  return {
    files: state.files,
  }
}, (dispatch) => {
  return {
    onSelectedChanged: (file, selected) => {
      dispatch(selectedChanged(file, selected))
    },
  }
})(Files)
