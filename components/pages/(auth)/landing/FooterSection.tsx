import { SITENAME } from '@/constants/globals'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

export function FooterSection() {
  const t = useTranslations('LandingPage.Footer')

  return (
    <div className="w-full pt-10 flex flex-col justify-start items-start">
      {/* Main Footer Content */}
      <div className="self-stretch h-auto flex flex-col md:flex-row justify-between items-stretch pr-0 pb-8 pt-0">
        <div className="h-auto p-4 md:p-8 flex flex-col justify-start items-start gap-8">
          {/* Brand Section */}
          <div className="self-stretch flex justify-start items-center gap-3">
            <div className="text-center text-[#49423D] text-xl font-semibold leading-4 font-sans">
              {SITENAME} - {t('AllRightsReserved')}
            </div>
          </div>
        </div>

        <div className="self-stretch p-4 md:p-8 flex flex-col sm:flex-row flex-wrap justify-start sm:justify-between items-start gap-6 md:gap-8">
          <div className="flex flex-col justify-start items-start gap-3 flex-1 min-w-[120px]">
            <div className="text-[rgba(73,66,61,0.50)] text-sm font-medium leading-5 font-sans">
              {t('Legal')}
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <Link
                href={'/' + ROUTES.TERMS_OF_USE}
                className="self-stretch text-[#49423D] text-sm font-normal leading-5 font-sans cursor-pointer hover:text-primary transition-colors"
              >
                {t('Terms')}
              </Link>
              <Link
                href={'/' + ROUTES.PRIVACY_POLICY}
                className="self-stretch text-[#49423D] text-sm font-normal leading-5 font-sans cursor-pointer transition-colors hover:text-primary"
              >
                {t('Privacy')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section with Pattern */}
      <div className="self-stretch h-12 relative overflow-hidden border-t border-b border-[rgba(55,50,47,0.12)]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="w-full h-full relative">
            {Array.from({ length: 400 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-[300px] h-16 border border-[rgba(3,7,18,0.08)]"
                style={{
                  left: `${i * 300 - 600}px`,
                  top: '-120px',
                  transform: 'rotate(-45deg)',
                  transformOrigin: 'top left',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
