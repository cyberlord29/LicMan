import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDataGrid from 'react-data-grid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import cx from 'classnames'

class Table extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedRow:[]

    }
  }
  createRows = (data) => {
    this._rows = data
  }

  rowGetter = (i) => {
    return this._rows[i]
  }
  


  render () {
    this.createRows(this.props.data)
    return (
      <div className={cx('infoCard', 'Lisence Table')}>
        <div className=''>
          <div>
            <ReactDataGrid
              columns   ={this.props.columns}
              rowGetter ={this.rowGetter}
              rowsCount ={this.props.data.length || 0}
              minHeight ={500}
              rowSelection={{
                showCheckbox: true,
                enableShiftSelect: true,
                onRowsSelected: this.props.onRowsSelected,
                onRowsDeselected: this.props.onRowsDeselected,
                selectBy: {
                  indexes: this.props.selected
                }
              }}
            />
          </div>
        </div>
        {/* <InfoCardSource /> */}
      </div>
    )
  }
}

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array
}

const mapStateToProps = ({ licMan }) => {
  return {
      licMan
    }
}

export default withRouter(connect(
  mapStateToProps,
  {
    
  }
)(Table))

