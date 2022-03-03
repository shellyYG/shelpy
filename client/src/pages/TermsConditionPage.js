import '../App.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DangerIcon from '../components/Icons/DangerIcon';

const TermsConditionaPage = () => {
  const { t } = useTranslation();
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  return (
    <div className='section-left-align'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '50px auto',
          }}
        >
          <div>
            <h1>
              Shelpy {' '}
              {t('terms_and_conditions')}
            </h1>
          </div>

          <div style={{ width: '80%', margin: 'auto', textAlign: 'start' }}>
            <div style={{ margin: '10px auto' }}>
              此服務條款更新於 2022 年 3 月 3 日。
              <br />
              歡迎您使用Shelpy，本產品係由『過來人有限公司(Shelpy,
              Inc.)』(下稱本公司或是Shelpy)所經營、建置、提供。
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>前言</p>
              本服務條款訂立之目的，乃保護Shelpy使用者與合作店家的利益，並達成本公司與使用者間之契約。所有Shelpy提供之服務
              (以下簡稱「Shelpy服務」)均依據本服務條款所訂定，任何使用者使用Shelpy服務時，請先詳細閱讀「本服務條款」、「Shelpy
              隱私權政策」，並請使用者確實遵守。
              若您無法遵守本服務條款內容，或對於本服務條款內容全部或部分不同意時，請勿使用Shelpy服務，您一旦使用Shelpy服務，即表示您已知悉且完全同意本服務條款的所有約定。
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                註冊與登入
              </p>{' '}
              1.若您開始使用本網站服務或完成會員註冊手續，即視為您已了解並同意本服務條款之所有內容。若您不同意本服務條款之任何內容或其後修改變更，建議您立即停止使用本網站之服務。
              <br />
              2.過來人有限公司保留不定時修改或變更本服務條款之權利。修改或變更後之服務條款，將於其在本網站公告並發布之翌日起7日後生效。若您於本服務條款修改或變更後，使用本網站所提供之服務，則視為您同意修改或變更後之服務條款。
              <br />
              3.若您未滿二十歲，應於法定代理人閱讀、了解並同意本服務條款之所有內容，方得使用。
              <br />
              4.
              使用本網站服務時，您將確保您於訂購時所提供的信用卡、金融卡或所使用之支付工具為您本人所有，或經信用卡或金融卡持卡人所授權使用。
              <br />
              5.
              此外，您將確保您有足夠的資金支付您的訂單，以及您所提供之帳戶資訊確實為您本人所有且正確無誤。
              <br />
              6. 我們將依照隱私條款 https://shelpy.co/zh-TW/privacy
              中蒐集、處理或利用您使用本網站所同意提供之個人資訊。
              <br />
              7.
              除您與過來人有限公司單獨達成的協議中另有約定外，本網站所提供之服務僅供您個人、非商業使用。
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                付款方式說明
              </p>{' '}
              過來人有限公司及其關聯企業就本網站目前僅提供信用卡線上刷卡此付款方式，係與喬睿科技股份有限公司、藍新科技股份有限公司合作，由藍新科技股份有限公司提供刷卡系統，各家銀行之VISA、Master
              Card皆可使用。
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                服務說明
              </p>{' '}
              Shelpy服務內容，係為經驗媒合平台，媒合承攬業務提供廠商(過來人)與消費者(新鮮人)，並在網路上，以承攬業務提供廠商(過來人)與消費者(新鮮人)線上開會之方式，提供服務。
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                所有權
              </p>{' '}
              本網站所提供之服務及其中的所有權利始終屬於過來人有限公司及其關聯企業的財產或其授權方的財產。
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                智慧財產權
              </p>{' '}
              本網站內容屬於過來人有限公司及其授權人所有，請勿以任何其他目的（包括但不限於）重製、更改、或以其他侵害智慧財產權之方式使用本網站之內容。
              本網站所出現之商標或Logo等，屬於過來人有限公司及其授權人所有，若未取得商標權人書面同意，請勿任意使用本網站所出現之商標或Logo等。
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                暫停服務
              </p>{' '}
              過來人有限公司將致力於維持本網站之正常營運，若出現不可抗力之因素（包括但不限於電腦病毒、系統固障、資料損失），本網站保留隨時暫停或中斷部份或全部服務。
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                修改變更
              </p>{' '}
              過來人有限公司有權隨時修訂本服務條款之內容，並於修訂後公佈於本網站，我們將盡一切合理商業努力通知您，也建議您隨時留意本服務條款之最新內容。
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                擔保與免責聲明
              </p>{' '}
              過來人有限公司及其關聯企業及合作廠商將盡一切上合理努力為您提供服務，除本條款或其他額外條款有明確規定者外，過來人有限公司或其關聯企業均不對本網站所提供之服務作任何保證。
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                一般條款
              </p>{' '}
              若本服務條款的任何條款根據任何法律被整體或部分視為非法、無效或不可強制執行，該條款或相關部份應被視為不屬於本服務條款，本服務條款的餘下條文的合法性、有效性及可強制執行性應不受影響。在該情況下，雙方應根據本服務條款的內容及目的，盡可能以效果類似於該非法、無效或不可強制執行條文（或部分）的合法、有效及可強制執行的條文（或部分）替換該非法、無效或不可強制執行條文（或部分）。
              本服務條款，包括任何本條款所包含之政策，構成雙方有關其主題事項的完整協議及理解，並替換及取代先前或同期所有有關該主題事項的協議或承諾。本條之規定並不限制您作為消費者依適用法律所不得排除之權利，包括消費者保護法。
              <br />
              <br />
              除當地法律另有其他規定外，本合約應以台灣法律為準據法，並排除衝突法原則之適用。如發生爭議，任一方均得向新北地方法院提起訴訟，或提交終局且具拘束力之仲裁，或使用雙方同意其他紛爭替代解決方式。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionaPage;
