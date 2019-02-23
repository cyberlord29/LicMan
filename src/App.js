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
} from './actions/lisence-actions'
import cx from 'classnames'
import AppNavigation  from './Components/AppNavigation'
import Licences from './Components/Licenses'
import { HeaderWrapper, AppContainer, FlexBox, Body, Title } from "./containers";
import background from './london-trading-group.png'
import Products from './Components/Products';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
    
  }

  componentDidMount(){
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
            {licMan.setNav==='Licenses' &&<Licences/>}
            {licMan.setNav==='Products'&&<Products/>}
          </Body>
        </AppContainer>
       </HeaderWrapper>
    )
  }
}

App.propTypes = {

}

const mapStateToProps = ({ licMan }) => {
  return {
      licMan
    }
}

export default connect(
  mapStateToProps,
  {

  }
)(App)