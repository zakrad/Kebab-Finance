import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {Web3Provider} from 'src/app/providers'

const App = () => {
  return (
    <Web3Provider>
      <Suspense fallback={<LayoutSplashScreen />}>
        <I18nProvider>
          <LayoutProvider>
            <Outlet />
            <MasterInit />
          </LayoutProvider>
        </I18nProvider>
      </Suspense>
    </Web3Provider>
  )
}

export {App}
