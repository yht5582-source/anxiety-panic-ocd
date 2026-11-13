# 心安導航：焦慮・恐慌・強迫症

繁體中文成人互動臨床決策輔助，提供安全檢核、症狀訪談、鑑別診斷、共同治療選擇及持續追蹤。

網站：https://yht5582-source.github.io/anxiety-panic-ocd/

## 功能

- **診斷評估**：同時評估GAD、恐慌與OCD，不以量表直接確診。急性身體警訊或立即傷害風險優先分流。
- **鑑別診斷**：檢視身體病因、藥物／物質／戒斷、雙相情緒、精神病、社交焦慮、創傷與憂鬱。
- **治療建議**：依疾病、功能影響、偏好與個人風險選CBT、ERP、SSRI或合併治療。醫療人員模式提供Sertraline／Escitalopram仿單劑量參考；另列高齡、肝腎功能、QT及交互作用提示。特殊情境會暫停個別用藥建議。
- **量表**：互動GAD-7教學翻譯；可記錄完整原版PDSS及Y-BOCS既有總分，未重製兩者完整題本。
- **追蹤**：同匿名代碼及同量表比較，記錄功能、恐慌次數及強迫症狀耗時。依當次安全風險、副作用、配合度與階段提示回診。提供JSON匯入／匯出、重複與衝突防護及列印計畫。
- **學習**：8個虛構病例；20題互動考題（基礎10題、進階10題），附逐題答案、解析、錯誤選項說明及來源；10條主幹、50個節點、120個重點的可搜尋／收合診療心智圖。
- **介面**：支援電腦與手機、鍵盤焦點、跳至內容、原生表單及列印。

## 使用流程

1. 填年齡、安全、功能、身體評估狀態與主要困擾。
2. 完成病程與逐項症狀訪談。
3. 確認鑑別與用藥風險，再產生照護方向。
4. 建立量表基線、匿名代碼與功能評估；每次使用同一量表版本追蹤。
5. 依臨床變化與照護計畫回診。網頁關閉後不會發送提醒。

## 來源與版本

內容查核2026-11-12，網站版本1.1.0。尚未正式發布的指引更新不作現行建議。

| 資料 | 用途 |
| --- | --- |
| [NICE CG113](https://www.nice.org.uk/guidance/cg113/chapter/Recommendations) | GAD與恐慌症成人治療、階梯照護、追蹤；2011發布，建議頁2020修訂 |
| [NICE CG31](https://www.nice.org.uk/guidance/cg31/chapter/Recommendations) | 成人OCD的ERP、SSRI與合併療法；2005發布 |
| [NIMH GAD](https://www.nimh.nih.gov/health/publications/generalized-anxiety-disorder-gad)／[恐慌](https://www.nimh.nih.gov/health/publications/panic-disorder-when-fear-overwhelms)／[OCD](https://www.nimh.nih.gov/health/publications/obsessive-compulsive-disorder-when-unwanted-thoughts-or-repetitive-behaviors-take-over) | 公開診斷與治療衛教，非獨立治療指引 |
| [DailyMed Sertraline](https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=14c4fa96-8919-4ea7-ad72-129f288d8cfc&type=display)／[Escitalopram](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d31c02d0-81d9-4aa4-bde9-52135aa5a66d) | 美國仿單劑量與安全參考；不代表台灣核准或健保給付 |
| [GAD-7：華盛頓大學](https://www.hiv.uw.edu/page/mental-health-screening/gad-7) | Spitzer等2006；中文為教學翻譯，正式臨床／研究應使用驗證版本 |

## 適用限制

限18歲以上一般門診情境。工具不是確診、處方或醫療監測服務。未滿18歲、懷孕／哺乳、躁症／精神病、未排除身體病因或危機，需專業評估。台灣適應症與健保須按實際品項及當日規範查核。Sertraline用於GAD可能屬仿單外用途。劑量參考不可直接與既有抗憂鬱藥疊加。

## 隱私

無後端、分析追蹤、外部字型或第三方腳本。預設紀錄只存在本次頁面；勾選同意才存入瀏覽器localStorage。共用裝置勿保存，勿輸入姓名／病歷號。匯出檔可能含健康資訊，需妥善保管。資料不會上傳至GitHub。清空本次評估與刪除追蹤分開處理。

## 維護與驗證

純靜態HTML/CSS/JavaScript，無安裝或建置步驟。GitHub Pages使用main分支根目錄，`.nojekyll`停用Jekyll。

```sh
node --check app.js
node --check clinical.js
node --test test.cjs learning.test.cjs
python3 -m http.server 8000
```

`clinical.js`為無DOM的評估規則；`app.js`處理介面與本機紀錄；`style.css`負責響應式及列印。測試涵蓋診斷門檻、急症分流、特殊族群、漏填、量表比較與日期。

更新臨床規則時需重新查核來源，修訂查核日期並檢查診斷邊界及安全分流。臨床內容應經精神科與院內藥事團隊審閱後，才用於正式照護流程。

## 1.1.0 學習功能更新（2026-11-13）

- 導覽新增「互動考題」與「診療心智圖」，網址分別為 `#quiz`、`#mindmap`。
- 考題需選答案後確認才計分，確認後鎖定；可按基礎／進階篩選、跳題、查看總結及錯題複習。切換頁籤保留作答，重新整理或重做後重置，不存入追蹤紀錄。
- 心智圖主題包括安全、症狀與鑑別、GAD、恐慌、OCD、共同決策、藥物安全、量化追蹤、療效不足與復發預防。支援全文搜尋、無結果提示、全部展開／收合。
- `learning-data.js` 儲存原創題目、答案、解析及心智圖節點；`learning.js` 負責學習互動。新增[IOCDF ERP資料](https://iocdf.org/about-ocd/ocd-treatment-guide/erp/)與[Sertraline仿單](https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=957ba196-0b9b-4cda-bd15-28357ced8d2f)來源。
- 新增內容查核日期2026-11-13；原診療流程與追蹤機制保留。成績僅供教學，不作臨床資格認證。
