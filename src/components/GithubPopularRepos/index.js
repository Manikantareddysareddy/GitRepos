import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    ActiveLanguageId: languageFiltersData[0].id,
    InitialRepoList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepoData()
  }

  getRepoData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {ActiveLanguageId, InitialRepoList} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${ActiveLanguageId}`

    const response = await fetch(url)
    const Data = await response.json()
    const updatedData = Data.popular_repos.map(eachRepo => ({
      name: eachRepo.name,
      id: eachRepo.id,
      issuesCount: eachRepo.issues_count,
      forksCount: eachRepo.forks_count,
      starsCount: eachRepo.stars_count,
      avatarUrl: eachRepo.avatar_url,
    }))
    this.setState({
      InitialRepoList: updatedData,
      apiStatus: apiStatusConstants.success,
    })
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeActiveTabItem = ActiveLanguageId => {
    this.setState({ActiveLanguageId}, this.getRepoData)
  }

  renderReposList = () => {
    const {InitialRepoList} = this.state
    return (
      <div className="Repo-container">
        <ul className="new-ul-container">
          {InitialRepoList.map(eachRepo => (
            <RepositoryItem RepoData={eachRepo} key={eachRepo.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="Failure-view"
      />
      <h1 className="fail-heading">Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {ActiveLanguageId, InitialRepoList, apiStatus} = this.state
    let viewItems
    switch (apiStatus) {
      case apiStatusConstants.success:
        viewItems = this.renderReposList()
        break
      case apiStatusConstants.failure:
        viewItems = this.renderFailureView()
        break
      case apiStatusConstants.inProgress:
        viewItems = this.renderLoadingView()
        break
      default:
        viewItems = null
        break
    }

    return (
      <div className="bg-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="ul-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              ActiveId={ActiveLanguageId}
              languageData={eachItem}
              key={eachItem.id}
              changeActiveTabItem={this.changeActiveTabItem}
            />
          ))}
        </ul>
        {viewItems}
      </div>
    )
  }
}

export default GithubPopularRepos
