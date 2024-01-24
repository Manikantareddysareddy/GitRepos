import './index.css'

const RepositoryItem = props => {
  const {RepoData} = props
  const {id, name, issuesCount, forksCount, starsCount, avatarUrl} = RepoData
  return (
    <li className="list-container">
      <img src={avatarUrl} className="avatar-image" alt={name} />
      <h1 className="repo-heading">{name}</h1>
      <div className="new-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="image"
        />
        <p className="count-para">{starsCount}</p>
      </div>
      <div className="new-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="image"
        />
        <p className="count-para">{forksCount}</p>
      </div>
      <div className="new-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="image"
        />
        <p className="count-para">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
