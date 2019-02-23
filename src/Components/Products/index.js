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
    setProductParams,
    createProduct,
    getProducts
} from '../../actions/lisence-actions'
import cx from 'classnames'
import Table from '../../Components/LisenceTable'
import { HeaderWrapper, AppContainer, FlexBox, Body, Title } from "../../containers";


class Products extends Component {
  constructor(props){
    super(props)
    this.state = {
      showCreate:false,
      selectedRow:[]
    }
    
  }

  componentDidMount(){
    this.props.getProducts()
  }

  handleChange = (e) => {
    this.props.setProductParams({id:e.target.itemref , value: e.target.value})
  }

  onRowsSelected = (rows) => {
    this.setState({selectedRow:rows,showModify:true})
    this.props.setProductParams({id:'load',value:rows[0].row})
  }

  onRowsDeselected = (rows) => {
    this.setState({selectedRow:[],showModify:false})
    this.props.setProductParams({id:'reset'})
  }

  getColumns = () => {
    const licenseColumns=[
      { key:'productName' , name:'Name',resizable:true},
    ]

    return licenseColumns
  }
  
  isValid = () => {
    var a =Object.keys(this.props.licMan.product).filter((a)=>{return this.props.licMan.product[a]===''}).length === 0
    // console.log( Object.keys(this.props.licMan.license).filter((a)=>{return this.props.licMan.license[a]===''}))
    return a 
  }

  createRows = (data) => {
    let rows = []
    for (let i = 0; i < data.length; i++) {
      rows.push({
        id: data[i].id,
        productName: data[i].name,
       })
    }
    return rows.reverse()
  }

  renderCreateLicensePanel(){
    const {
      product
    } = this.props.licMan
    return (
        <div style={{display:'flex'}}>
        <FlexBox>
          <FormControl.Feedback />
          <label className="minWidthLabelModelConf">First Name</label>
          <FormControl
              className = {cx('inputText', '')}
              type = "text"
              placeholder="Product Name"
              itemRef='produname' 
              value={product.name}
              onChange={(e)=>{this.props.setProductParams({id:'name', value:e.target.value})}}
          />
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
                Create Product
             {this.state.showCreate && 
               <Button bsStyle='primary' disabled={!this.isValid()} onClick={()=>{this.props.createProduct({name:licMan.product.name,version:'na',platform:''})}} >
                 Create
               </Button>
             }
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
            </div>
            </Panel.Heading>
              <Panel.Body>
              <Table
                columns = {this.getColumns()}
                data = {this.createRows(this.props.licMan.productData)}
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

Products.propTypes = {
  setProductParams: PropTypes.func,
  createProduct: PropTypes.func,
  getProducts: PropTypes.func,
}

const mapStateToProps = ({ licMan }) => {
  return {
      licMan
    }
}

export default connect(
  mapStateToProps,
  {
    setProductParams,
    createProduct,
    getProducts
  }
)(Products)