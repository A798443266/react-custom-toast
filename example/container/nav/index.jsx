import React from 'react'

import './main.styl'

export default class Nav extends React.PureComponent {
  render() {
    return (
      <nav className='z-nav'>
        <h4>react-custom-toast</h4>
        <span className='nav-end'>
          <a href="//github.com/zhzxang/react-custom-toast"><span className='iconfont icon-github'></span></a>
        </span>
      </nav>
    )
  }
}
