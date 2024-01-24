import './index.css'

const LanguageFilterItem = props => {
  const {ActiveId, languageData, changeActiveTabItem} = props
  const {id, language} = languageData

  const ActiveClassName = ActiveId === id ? 'Active-para' : null

  const changeActiveTab = () => {
    changeActiveTabItem(id)
  }

  return (
    <li className="list-item">
      <button
        className={`para ${ActiveClassName}`}
        type="button"
        onClick={changeActiveTab}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
