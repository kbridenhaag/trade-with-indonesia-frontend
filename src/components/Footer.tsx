import { GetStaticProps } from 'next'
import Image from 'next/image'
import { GridColumn } from '../kbridh/GridColumn'
import { GridRow } from '../kbridh/GridRow'
import { WidthContainer } from '../kbridh/WidthContainer'

export const Footer = () => {
  return (
    <footer className="app-footer">
      <WidthContainer>
        <GridRow>
          <GridColumn width="one-third" fromDesktop>
            <div className="app-footer__logo">
              <div className="app-footer__logo-img">
                <Image
                  src="/assets/images/kbridh-logo.png"
                  layout="fill"
                  alt=""
                />
              </div>

              <span className="app-footer__logotype">
                <span className="govuk-!-font-weight-bold">
                  The Embassy of
                  <br aria-hidden="true" />
                  the Republic of Indonesia
                  <br aria-hidden="true" />
                </span>
                The Hague
              </span>
            </div>
          </GridColumn>
          <GridColumn width="two-thirds" fromDesktop>
            <div className="govuk-grid-column-two-thirds-from-desktop">
              <a
                rel="license"
                href="http://creativecommons.org/licenses/by/4.0/"
              >
                <Image
                  alt="Creative Commons Licence"
                  src="/assets/images/cc-by.png"
                  width={80}
                  height={15}
                />
              </a>
              <br />
              Copyright © 2022 Indonesia.nl. <br />
              Except where otherwise noted, this website is licensed under a{' '}
              <a
                rel="license"
                href="http://creativecommons.org/licenses/by/3.0/deed.en_US"
              >
                Creative Commons Attribution 3.0 Unported License
              </a>
              .
            </div>
          </GridColumn>
        </GridRow>
      </WidthContainer>
    </footer>
  )
}
