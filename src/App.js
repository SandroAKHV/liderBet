import Layout from './core/Layout'
import { FeedProvider } from './context/FeedContext'
import LanguageSwitcher from './shared/LanguageSwitcher'
import "./styles/app.scss"
function App() {

  return (
    <FeedProvider>
      <div className='top-bar'>
        <div className='langauge-wrap'>
          <LanguageSwitcher />
        </div>
      </div>
      <div className='container'>
        <Layout />
      </div>
    </FeedProvider>
  )
}

export default App
