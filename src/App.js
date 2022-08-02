import Layout from './core/Layout'
import { FeedbackProvider } from './context/FeedContext'
import LanguageSwitcher from './shared/LanguageSwitcher'
import "./styles/app.scss"
function App() {

  return (
    <FeedbackProvider>
      <div className='top-bar'>
        <div className='langauge-wrap'>
          <LanguageSwitcher />
        </div>
      </div>
      <div className='container'>
        <Layout />
      </div>
    </FeedbackProvider>
  )
}

export default App
