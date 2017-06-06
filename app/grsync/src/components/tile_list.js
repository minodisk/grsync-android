import React, {
  Component
} from 'react'
import {
  ListView,
} from 'react-native'
import Dimensions from 'Dimensions'

import Tile from './tile'
import SectionHeader from './section_header'

const window = Dimensions.get('window')

export default class TileList extends Component {
  constructor() {
    super()
    this.state = {width: window.width}
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (prev, next) => prev.id !== next.id,
      sectionHeaderHasChanged: (prev, next) => prev.dirname !== next.dirname,
    })
  }

  render() {
    const {width} = this.state
    const {size, margin, data} = this.props
    const columns = width / (size + margin)  >> 0
    const s = (width - margin * (columns - 1)) / columns

    // Fill the end of the tiles with empty data
    // so that each line is filled to the right end.
    const d = {}
    Object.keys(data).forEach((section) => {
      const files = Array.prototype.concat.call([], data[section])
      let lacks = (columns - files.length % columns) % columns
      while (lacks > 0) {
        files.push(null)
        lacks--
      }
      d[section] = files
    })

    return (
      <ListView
        dataSource={this.dataSource.cloneWithRowsAndSections(d)}
        enableEmptySections={true}
        pageSize={columns}
        renderSectionHeader={(files, sectionID, rowID) => (
          <SectionHeader
            style={{
              width,
              paddingTop: 10,
              paddingLeft: 12,
              paddingBottom: 12,
            }}
            textStyle={{
              color: 'rgb(0, 0, 0)',
              fontSize: 15,
              fontWeight: '500',
            }}
          >{sectionID}</SectionHeader>
        )}
        renderRow={(data, sectionID, rowID, highlightRow) => {
          return <Tile
            data={data}
            size={s}
            style={{
              marginBottom: margin,
            }}
            onSelectedChanged={(selected) => this.onSelectedChanged(data, selected)}
          />
        }}
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onLayout={(e) => {
          this.setState({
            width: e.nativeEvent.layout.width,
          })
        }}
      />
    )
  }

  onSelectedChanged(file, selected) {
    if (this.props.onSelectedChanged != null) {
      this.props.onSelectedChanged(file, selected)
    }
  }
}
