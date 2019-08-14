import React from 'react'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import { Radio } from 'antd'
import Layout from 'src/components/Layout'
import { Mobile, Default } from 'src/constants/mediaQueries'
import Edit from 'src/components/MapEdit'
import { Level } from 'src/components/MapComponents'
import Occupancy from 'src/components/charts/Occupancy'
import { confirm } from 'src/lib/modalConfirm'
import { SERVICE } from 'src/constants/roles'

const Map = Page => {
  return class extends React.Component {
    static async getInitialProps (ctx) {
      const props = Page.getInitialProps ? await Page.getInitialProps(ctx) : {}
      const { BACKEND_URL } = props.def
      const { diagnostic } = nextCookie(ctx)
      const url = diagnostic ? `${BACKEND_URL}/diagnostic?id=${diagnostic}` : `${BACKEND_URL}/map`
      const res = await fetch(url)
      const json = await res.json()
      const data = diagnostic ? json.map : json
      return {
        ...props,
        diagnostic: diagnostic,
        map: data,
        occupancy: data.statistics[0]
      }
    }

    state = {
      map: this.props.map,
      occupancy: this.props.occupancy,
      visibilityFilter: 'SHOW_NUMBERS',
      editModal: {
        stall: 0,
        value: 0,
        visible: false
      }
    }

    send = (event, data) => {
      this.ws.send(JSON.stringify({
        event: event,
        data: data
      }))
    }

    subscribe = () => {
      const { diagnostic } = this.props
      const { WEBSOCK_URL } = this.props.def
      this.ws = new WebSocket(`${WEBSOCK_URL}?channel=ch1`)
      this.ws.onerror = e => console.log(e)
      this.ws.onmessage = e => {
        const data = JSON.parse(e.data)
        Object.keys(data).forEach((key) => {
          if (!diagnostic && key === 'map') {
            const { map } = data
            this.setState({
              map: map,
              occupancy: map.statistics[0]
            })
          }
        })
      }
    }

    componentDidMount () {
      this.subscribe()
    }

    componentWillUnmount () {
      this.ws.close()
    }

    render () {
      const { APS_TITLE, SIDEBAR_MENU, WEBSOCK_URL } = this.props.def
      const { CARDS, STALLS, STALL_STATUS } = this.props.def
      const { map, editModal, visibilityFilter, occupancy } = this.state
      const levels = map.levels.map((l, i) => {
        return (
          <Level
            level={l}
            key={i}
            stallStatus={this.props.def.STALL_STATUS}
            visibilityFilter={visibilityFilter}
            openModal={this.openModal}
          />
        )
      })
      return (
        <Layout
          aps={APS_TITLE}
          pageTitle='System Map'
          sidebarMenu={SIDEBAR_MENU}
          socket={`${WEBSOCK_URL}?channel=ch2`}
        >
          <Mobile>
            <Occupancy data={occupancy} />
          </Mobile>
          <Default>
            <Page {...this.props} levels={levels} occupancy={<Occupancy data={occupancy} />} />
            <Radio.Group
              onChange={this.handleRadioChange}
              value={visibilityFilter}
            >
              <Radio value={'SHOW_NUMBERS'}>
                Number
              </Radio>
              <Radio value={'SHOW_CARDS'}>
                Card
              </Radio>
              <Radio value={'SHOW_SIZES'}>
                Size
              </Radio>
            </Radio.Group>
            <Edit
              cards={CARDS}
              stalls={STALLS}
              stallStatus={STALL_STATUS}
              data={editModal}
              onCancel={this.closeModal}
              onChange={this.handleChange}
              onConfirm={this.handleConfirm}
            />
          </Default>
        </Layout>
      )
    }

    openModal = (stall, card) => {
      if (this.props.currentUser.role <= SERVICE) {
        this.setState({
          editModal: {
            ...this.state.editModal,
            stall: stall,
            value: card,
            visible: true
          }
        })
      }
    }

    closeModal = () => {
      this.setState({
        editModal: {
          ...this.state.editModal,
          stall: 0,
          value: 0,
          visible: false
        }
      })
    }

    handleChange = (stall, card) => {
      this.setState({
        editModal: {
          ...this.state.editModal,
          stall: stall,
          value: card
        }
      })
    }

    handleConfirm = (stall, card) => {
      this.setState({
        editModal: {
          ...this.state.editModal,
          stall: 0,
          value: 0,
          visible: false
        }
      })
      let data = {
        stall: stall,
        card: card
      }
      confirm('Map edit', `Confirm change for stall ${stall} ?`, this.send, 'edit-stall', data)
    }

    handleRadioChange = e => this.setState({ visibilityFilter: e.target.value })

  }
}

export default Map