import '../App.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DangerIcon from '../components/Icons/DangerIcon';

const HelperContractPage = () => {
  const { t } = useTranslation();
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const navigate = useNavigate();
  
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
              {t('helper_terms')}
            </h1>
          </div>

          <div style={{ width: '80%', margin: 'auto', textAlign: 'start' }}>
            <div style={{ margin: '10px auto' }}>
              過來人有限公司(以下簡稱「本公司」或「Shelpy」)與承攬諮詢廠商(以下簡稱「過來人」)
              訂有「勞務承攬合約」，故訂定本服務條款供過來人於提供服務時以玆遵循，過來人於每次執行視訊諮詢服務時，均同意本服務條款之約定：
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>前言</p>
              1、本公司為保障消費者權益、廣告暨恪遵政府法令及相關規範，爰訂定本服務條款。
              <br />
              2、基於前言第一款意旨，本公司對本服務條款規定保有最終解釋之權利。
              <br />
              3、本公司對違反服務條款規定之事實認定保有最終認定權利。
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                一般條款
              </p>{' '}
              1、 過來人 應提供的服務，包括但不限於：
              <br />
              與消費者在指定日期、指定時間、在網路上履行諮詢服務。
              <br />
              2、為保障消費者權益與服務品質，過來人在提供服務時，應避免應避免下述行為，或有發生疑似類似的情形，
              <br />
              本公司可能暫時停止派單並考慮後續是否繼續合作關係：
              <br />
              (1) 未準時出席會議。 <br />
              (2) 口語之衝突、侮辱。 <br />
              (3) 欺騙、偷竊、妨害名譽、傷害或破壞之行為。
              <br />
              (4) 不正常或不道德之交易。 <br />
              (5) 經由任何形式或管道洩漏第三人之個人資料
              （包括但不限於姓名、出生年月日、身分證字
              號、統一編號、聯絡方式（含電話、地址）），或利用取得之個人資料侵犯第三人之隱私及
              自由(包括但不限於騷擾第三人)。
              <br />
              (6) 洩漏與承攬服務無關之未公開資訊。
              <br />
              (7)
              利用本公司的資源拿到消費者資料後、與消費者私下交易、而未透過本公司平台。
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                承攬報酬結算
              </p>{' '}
              1、 報酬內容：依本公司公告現時費率為準，目前為交易金額之85%。
              <br />
              2、
              計算方式：依本公司公告費率為主，並扣除二代健保補充保費、扣繳稅款及其他扣項(如法院
              扣款)
              <br />
              3、 報酬發放日：每月 10 日，遇假日本公司可能提前或延後發放。
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                暫停派單/終止外送合約
              </p>{' '}
              如本公司合理懷疑以下事項，可能未經通知立即或在後續承攬期間暫時停止派單，並依情節輕重
              考慮後續合作關係： <br />
              (1) 違反承攬服務條款 <br />
              (2) 發生重大事件，涉及危害公司商譽。 <br />
              (3) 違反相關法令或政府規範 <br />
              (4) 私下接單 <br />
              (5)
              違反誠實信用(如詐欺、侵占、不正常交易等)、善良風俗、公共秩序之行為
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelperContractPage;
