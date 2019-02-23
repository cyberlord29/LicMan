import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../../index.css'
import {
  PageHeader,
  FormControl,
  Panel,
  Button
} from 'react-bootstrap'
import {
  setParams,
  createLicense,
  getLicenses,
  deleteLicense,
  modifyLicense
} from '../../actions/lisence-actions'
import cx from 'classnames'
import Table from '../../Components/LisenceTable'
import { HeaderWrapper, AppContainer, FlexBox, Body, Title } from "../../containers";


class Licenses extends Component {
  constructor(props){
    super(props)
    this.state = {
      showCreate:false,
      selectedRow:[]
    }
    
  }

  componentDidMount(){
    this.props.getLicenses()
  }

  handleChange = (e) => {
    this.props.setParams({id:e.target.itemref , value: e.target.value})
  }

  onRowsSelected = (rows) => {
    this.setState({selectedRow:rows,showModify:true})
    this.props.setParams({id:'load',value:rows[0].row})
  }

  onRowsDeselected = (rows) => {
    this.setState({selectedRow:[],showModify:false})
    this.props.setParams({id:'reset'})
  }

  getColumns = () => {
    const licenseColumns=[
      { key:'user', name:'User' ,resizable:true},
      { key:'email', name:'Email' , resizable:true},
      { key:'productName' , name:'Product',resizable:true},
      { key:'accountNumber', name:'Account Number',resizable:true},
      { key:'endDateTime' , name:'Valid Till' , resizable:true},
    ]

    return licenseColumns
  }
  
  isValid = () => {
    var a =Object.keys(this.props.licMan.license).filter((a)=>{return this.props.licMan.license[a]===''}).length === 0
    // console.log( Object.keys(this.props.licMan.license).filter((a)=>{return this.props.licMan.license[a]===''}))
    return a 
  }

  createRows = (data) => {
    let rows = []
    for (let i = 0; i < data.length; i++) {
      let epoch = new Date(data[i].end_time.substring(0,data[i].end_time.length-9)).getTime() - new Date().getTime()
      let days = Math.floor(epoch/86400000.0)
      console.log(data[i].end_time.substring(0,data[i].end_time.length-9))
      rows.push({
        id: data[i].id,
        productName: JSON.parse(data[i].product).name,
        user: JSON.parse(data[i].user).first_name + ' ' + JSON.parse(data[i].user).last_name,
        firstName:JSON.parse(data[i].user).first_name,
        lastName: JSON.parse(data[i].user).last_name,
        email: JSON.parse(data[i].user).email,
        accountNumber:data[i].account_number,
        endDateTime:data[i].end_time,
        endTime: epoch,
        period: days.toString()
       })
    }
    return rows.reverse()
  }

  renderCreateLicensePanel(){
    const {
      license
    } = this.props.licMan
    return (
        <div style={{display:'flex'}}>
        <FlexBox>
          <label className="">Email ID</label>
          <FormControl
              className = {cx('inputText', '')}
              type = "text"
              placeholder="Email ID"
              itemRef='email' 
              value={license.email}
              onChange={(e)=>{this.props.setParams({id:'email', value:e.target.value})}}
          />
          <FormControl.Feedback />
          <label className="minWidthLabelModelConf">First Name</label>
          <FormControl
              className = {cx('inputText', '')}
              type = "text"
              placeholder="First Name"
              itemRef='firstName' 
              value={license.firstName}
              onChange={(e)=>{this.props.setParams({id:'firstName', value:e.target.value})}}
          />
          <FormControl.Feedback />
          <label className="">Last Name</label>
          <FormControl
              className = {cx('inputText', '')}
              type = "text"
              itemRef='lastName' 
              placeholder="Last Name"
              value={license.lastName}
              onChange={(e)=>{this.props.setParams({id:'lastName', value:e.target.value})}}
          />
          <FormControl.Feedback />
          <label className="">Account Number</label>
          <FormControl
              className = {cx('inputText', '')}
              type = "text"
              itemRef='lastName' 
              placeholder="ACC No"
              value={license.accountNumber}
              onChange={(e)=>{this.props.setParams({id:'accountNumber', value:e.target.value})}}
          />
          <FormControl.Feedback />
          </FlexBox>
          <FlexBox>
          <div className = 'flexBox'>
          <label className="">Product Name</label>
          <FormControl
              className = {cx('inputText', '')}
              itemRef='productName' 
              type = "text"
              placeholder="Product Name"
              value={license.productName}
              onChange={(e)=>{this.props.setParams({id:'productName', value:e.target.value})}}
          />
          <FormControl.Feedback />
          </div>
          <div className = 'flexBox'>
          <label className="">Period</label>
          <FormControl
              className = {cx('inputText', '')}
              itemRef='period' 
              type = "text"
              placeholder="Period in Days"
              value={license.period}
              onChange={(e)=>{this.props.setParams({id:'period', value:e.target.value})}}
          />
          <FormControl.Feedback />
          {/* {this.state.selectedRow.length!=0 && <label>{license.periodLabel}</label>} */}
          </div>
          </FlexBox>
        </div>
    )
  }

  renderheading = () => {
    if(this.state.selectedRow.length>0)
      return(
        <div>License Details</div>
      )
    else
      return(
        <div>Create License</div>
      )
  }

  render () {
    const {
      licMan
    } = this.props
    let selected = this.state.selectedRow.length>0?[this.state.selectedRow[0].rowIdx]:[]
    return (
      <div>
            <Panel id="createPanel" >
            <Panel.Heading >
            <Panel.Toggle onClick={()=>{this.setState({showCreate:!this.state.showCreate})}}> 
              <div style={{display: 'flex' , flexDirection: 'row' , alignItems:'center', justifyContent:'space-between'}}>
            {this.renderheading()}
            <div style={{display: 'flex' , flexDirection: 'row' , alignItems:'center', justifyContent:'space-between'}}>
             
              {this.state.showModify && this.state.showCreate &&
               <Button bsStyle='warning' disabled={!this.isValid()} style={{marginRight:'5px'}} onClick={()=>{this.props.modifyLicense(this.props.licMan.license)}} >
                  Modify
                </Button>
              }
              {this.state.showCreate && 
                <Button bsStyle='primary' disabled={!this.isValid()} onClick={()=>{this.props.createLicense(this.props.licMan.license)}} >
                  Create
                </Button>
              }
              </div>
              </div>
              </Panel.Toggle>
            </Panel.Heading>
            <Panel.Collapse>
              <Panel.Body>
              {this.renderCreateLicensePanel()}
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
          <Panel id="Table" defaultExpanded>
            <Panel.Heading>
            <div style={{display: 'flex' , flexDirection: 'row' , alignItems:'center', justifyContent:'space-between'}}>
              <Panel.Title>
              Licences
              </Panel.Title>
              {this.state.showModify && 
                <Button bsStyle='danger' disabled={!this.state.selectedRow.length>0} onClick={()=>{this.props.setParams({id:'reset'});this.props.deleteLicense({id:this.props.licMan.license.id})}} >
                  Delete
                </Button>
              }
            </div>
            </Panel.Heading>
              <Panel.Body>
              <Table
                columns = {this.getColumns()}
                data = {this.createRows(this.props.licMan.licenseData)}
                onRowsSelected = {this.onRowsSelected}
                onRowsDeselected = {this.onRowsDeselected}
                selected = {selected }
              >
              </Table>
              </Panel.Body>
              </Panel>
        </div>
    )
  }
}

Licenses.propTypes = {
  setParams: PropTypes.func,
  createLicense: PropTypes.func,
  getLicenses: PropTypes.func,
  modifyLicense: PropTypes.func,
  deleteLicense: PropTypes.func
}

const mapStateToProps = ({ licMan }) => {
  return {
      licMan
    }
}

export default connect(
  mapStateToProps,
  {
    setParams,
    createLicense,
    getLicenses,
    deleteLicense,
    modifyLicense
  }
)(Licenses)