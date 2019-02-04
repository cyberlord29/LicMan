import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './index.css'
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
} from './actions/lisence-actions'
import cx from 'classnames'
import Table from './Components/LisenceTable'
import { AppNavigation } from './Components/AppNavigation';
import { HeaderWrapper, AppContainer, FlexBox, Body, Title } from "./containers";
import background from './london-trading-group.png'
import { create } from 'jss';

class DeleteButton extends React.Component {
  static propTypes = {
    value: PropTypes.any
  }

  onClick = (val, title) => {
      this.props.value.action(val, title)
  }

  render() {
    return (
          <div>
              <button onClick={() => this.onClick(this.props.value.val, this.props.value.title)}>{this.props.value.title}</button>
          </div>
      );
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      showCreate:true
    }
    
  }

  componentDidMount(){
    this.props.getLicenses()
  }

  handleChange = (e) => {
    this.props.setParams({id:e.target.itemref , value: e.target.value})
  }

  getColumns = () => {
    const licenseColumns=[
      { key:'user', name:'User' ,resizable:true},
      { key:'product' , name:'Product',resizable:true},
      { key:'account_number', name:'Account Number',resizable:true},
      { key:'id' , name:'License Key',resizable:true},
      { key:'end_time' , name:'Valid Till' , resizable:true}
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
      rows.push({
        id: data[i].id,
        product: JSON.parse(data[i].product).name,
        user: JSON.parse(data[i].user).first_name + ' ' +JSON.parse(data[i].user).last_name,
        email: JSON.parse(data[i].user).email,
        account_number:data[i].account_number,
        end_time:data[i].end_time
       })
    }
    return rows
  }

  renderCreateLicensePanel(){
    const {
      licMan
    } = this.props
    return (
        <div style={{display:'flex'}}>
        <FlexBox>
          <label className="">Email ID</label>
          <FormControl
              className = {cx('inputText', '')}
              type = "text"
              placeholder="Email ID"
              itemRef='email' 
              value={licMan.email}
              onChange={(e)=>{this.props.setParams({id:'email', value:e.target.value})}}
          />
          <FormControl.Feedback />
          <label className="minWidthLabelModelConf">First Name</label>
          <FormControl
              className = {cx('inputText', '')}
              type = "text"
              placeholder="First Name"
              itemRef='firstName' 
              value={licMan.firstName}
              onChange={(e)=>{this.props.setParams({id:'firstName', value:e.target.value})}}
          />
          <FormControl.Feedback />
          <label className="">Last Name</label>
          <FormControl
              className = {cx('inputText', '')}
              type = "text"
              itemRef='lastName' 
              placeholder="Last Name"
              value={licMan.lastName}
              onChange={(e)=>{this.props.setParams({id:'lastName', value:e.target.value})}}
          />
          <FormControl.Feedback />
          <label className="">Account Number</label>
          <FormControl
              className = {cx('inputText', '')}
              type = "text"
              itemRef='lastName' 
              placeholder="ACC No"
              value={licMan.accountNumber}
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
              value={licMan.productName}
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
              value={licMan.Period}
              onChange={(e)=>{this.props.setParams({id:'period', value:e.target.value})}}
          />
          <FormControl.Feedback />
          </div>
          </FlexBox>
        </div>
    )
  }


  render () {
    const {
      licMan
    } = this.props
    return (
      <HeaderWrapper>
        <PageHeader className='header'>
          <img src={background} height={'60px'}/>
          <div style={{fontFamily:'Agency FB', fontSize:'16px' ,color:'grey',display:'inline',letterSpacing:'1px'}}>CONSOLE</div>
        </PageHeader>
        <AppContainer>
            <AppNavigation />
          <Body>
            <Panel id="createPanel" defaultExpanded>
            <Panel.Heading >
            <Panel.Toggle onClick={()=>{this.setState({showCreate:!this.state.showCreate})}}> 
              <div style={{display: 'flex' , flexDirection: 'row' , alignItems:'center', justifyContent:'space-between'}}>
            Create License
                {this.state.showCreate && <Button disabled={!this.isValid()} onClick={()=>{this.props.createLicense(this.props.licMan.license)}} >
                  Create
                </Button>}
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
              <Panel.Title>
              Licences
              </Panel.Title>
            </Panel.Heading>
              <Panel.Body>
              <Table
                columns = {this.getColumns()}
                data = {this.createRows(this.props.licMan.licenseData)}
              >
              </Table>
              </Panel.Body>
              </Panel>
            </Body>
        </AppContainer>
       </HeaderWrapper>
    )
  }
}

App.propTypes = {
  setParams: PropTypes.func,
  createLicense: PropTypes.func,
  getLicenses: PropTypes.func
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
    getLicenses
  }
)(App)