#!/usr/bin/env node
/**
 * CLI Runner for Document Extraction
 * Tests the extraction prototype with sample data
 */

import { extractGovernanceObjectives, formatResultsAsMarkdown } from './index.js';

// Sample test data from Bank of England Court Minutes
const BOE_COURT_MINUTES = `
# Minutes of the Meeting of the Court of Directors held on 28 October 2025

The Bank's Court of Directors acts as a unitary board, setting the organisation's strategy and budget and taking key decisions on resourcing and appointments. Required to meet a minimum seven times per year, it has five executive members from the Bank and up to nine non-executive members.

## 1. Conflicts, Minutes and Matters Arising

There were no conflicts declared in relation to the present agenda.
The minutes of the meeting held on 19 September were approved.

## 2. Governor's Update

The Governor updated Court on the Bank's business and workforce planning, noting the two critical aspects were now to engage the Bank's broader leadership on the programme and to ensure the Bank had the capacity to deliver planned changes.

The Governor informed Court that following Court's approval of the changes to the Bank's FX balance sheet, the Bank had successfully issued an additional dollar bond.

Court heard that the Bank would launch the consultation on the stablecoins regime on 10 November.

## 3. Audit and Risk Committee (ARCo) Update

Jonathan Bewes gave an update on the recent meeting of ARCo. In the Audit meeting, ARCo heard from the external auditors, Ernst & Young, on the planning for next year's audit and had a discussion on how the workforce planning programmes would be accounted for. ARCo also received an update from Internal Audit on recently completed audits.

In the Risk meeting, ARCo received an update on decisions regarding the investment portfolio, as well as the revised Risk directorate strategy and its implementation. ARCo reviewed the new cyber-security dashboard and had an update on access management metrics. Directors noted the increase in cyber-attacks by state actors in other jurisdictions and the importance of the Bank remaining vigilant.

The Chair asked that an assessment of cyber-risk come to Court.

## 4. Remuneration Committee (RemCo) Update

Diana Noble gave an update on the recent meeting of RemCo. RemCo approved the creation of a Mutually Agreed Resignation (MAR) Scheme and the terms of the scheme. RemCo discussed the actions needed to ensure effective engagement with staff around the scheme. RemCo also emphasised the importance of ensuring the scheme was used to deliver sustainable cost savings.

Directors confirmed support for the proposals.

## 5. COO Update

Sarah John updated Court on the Bank's annual salary review and negotiations with the Union on the offer and said that the Union had recommended the Bank's offer to staff. She added that progress had been made on the SharePoint migration, and the first new and improved laptops had been rolled out.

In response to questions, Sarah John said the Bank remained committed to reaching 500 staff in Leeds. She added that Governors had agreed that, to further progress towards this target, Executive Directors would be required to recruit 50% of any external recruitment to the Leeds office.

## 6. 2025/2026 Q2 Financial Forecast

Court congratulated Afua Kyei on being voted the most influential person of African or African Caribbean heritage in the United Kingdom in the 2026 Powerlist.

Afua Kyei gave an update on the current financial position, noting an underspend is expected in 25/26 due to areas making a start on meeting the 8% cost challenge in 26/27. This underspend would be used to support workforce planning programmes.

## 7. Business Planning 2026/27 Update

Jo Hill introduced the paper noting that with the Bank's strategic goals having been set, these were now the necessary steps to deliver them.

Directors raised the importance of embedding transformation and productivity in the Bank's culture. Directors noted that the 8% target was applied equally across the Bank.

The Chair noted the importance of delivering the benefits of the transformation programmes to staff, including better technology, to show the positive impact of the Bank changing. Court approved the plans.

## 8. Location Strategy Project (LSP) – Strategic Business Case

Vivienne Grafton introduced the paper, noting this was a once in a generation opportunity to improve both the Bank's premises and its geographical reach. Vivienne Grafton noted that the cost savings from exiting Moorgate meant the project had a positive net present value with a capacity to absorb potential cost overruns.

Directors discussed the importance of value for money and ensuring the Bank maintained the building appropriately, which was of substantial historical interest and a national asset. Directors noted there was a reputational risk around the rebuild and that the robustness of the business case and communications were critical.

## 9. Six-Monthly Risk Report

Jon Rand introduced the Risk report and said that the Bank's important business services remain resilient, although some of the more obsolete systems the Bank continues to need to run require continual maintenance. Jon Rand said that reviews of cyber-risk in the supply chain had been positive but that supply chain risk, especially for cyber, was an area of heightened concern due to external events.

Directors discussed the heightened people, operational and delivery risks coming from running major operational change programmes and workforce change programmes concurrently. Jon Rand said that Risk would seek to identify leading indicators for risks crystallising through workforce changes and that business areas would seek to identify single points of failure.
`;

// Sample test data from HSBC Corporate Governance Report
const HSBC_GOVERNANCE = `
# Corporate Governance Report

HSBC continues to enhance its corporate governance practices and procedures to support the Board's commitment to high standards of corporate governance.

## Board and executive governance

The Board, led by the Group Chairman, is responsible for, among other matters:
– promoting the Group's long-term success and delivering sustainable value to shareholders;
– establishing and approving the Group's strategy and objectives, and monitoring the alignment of the Group's purpose, strategy and values with the desired culture and standards;
– setting the Group's risk appetite and monitoring the Group's risk profile;
– approving and monitoring capital and financial resource plans for achieving strategic objectives, including material transactions;
– considering and approving the Group's technology and environmental, social and governance strategies;
– reviewing the effectiveness of stakeholder engagement mechanisms, including engagement with the workforce;
– approving the appointment and remuneration of Directors, including Board roles;
– reviewing the Group's overall corporate governance arrangements; and
– providing entrepreneurial leadership of the Group within a framework of prudent and effective controls, which enable risks to be assessed and managed.

## Our approach to risk

Our risk appetite defines the level and types of risk that we are willing to take, while informing the financial planning process and guiding strategic decision making. Our risk appetite is defined as the aggregate level of risk that we are comfortable to take to achieve our strategic objectives.

The Group's risk appetite is considered, developed, and enhanced through the following principles:
– alignment with our strategy, purpose, values, external risk environment, reputational and customer needs;
– compliance with applicable laws, regulations and regulatory priorities;
– forward-looking insights into future risk exposure;
– sufficiency of available capital, liquidity and balance sheet leverage to absorb the risks;
– capacity and capabilities of people to manage the risk landscape;
– functionality, capacity and resilience of available systems to manage the risk landscape;
– effectiveness of the applicable control environment to mitigate risk; and
– internally and externally disclosed commitments.

## Risk management

We recognise that the primary role of risk management is to help protect our customers, business, colleagues, shareholders and the communities that we serve, while ensuring we are able to support our strategy and provide sustainable growth.

This is supported through our three lines of defence model:
– The first line of defence owns the risks and is responsible for identifying, recording, reporting and managing these risks in line with risk appetite.
– The second line of defence challenges the first line of defence on effective risk management, and provides advice, guidance and assurance.
– The third line of defence is our Global Internal Audit function, which provides independent assurance as to whether our risk management approach and processes are designed and operating effectively.
`;

function runTest(name: string, content: string, source: string): void {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`TEST: ${name}`);
  console.log('='.repeat(80));
  
  const result = extractGovernanceObjectives(content, source, {
    organization: name.includes('BoE') ? 'Bank of England' : 'HSBC Holdings plc'
  });
  
  console.log(formatResultsAsMarkdown(result));
  
  console.log('\n--- Raw Objectives ---\n');
  for (const obj of result.objectives.slice(0, 5)) {
    console.log(`[${obj.id}] ${obj.text}`);
    console.log(`   Source: ${obj.sourceSection} | Confidence: ${obj.extractionConfidence}`);
    console.log(`   Keywords: ${obj.keywords.join(', ')}`);
    console.log('');
  }
  if (result.objectives.length > 5) {
    console.log(`   ... and ${result.objectives.length - 5} more objectives\n`);
  }
}

function main(): void {
  console.log('Document Extraction Prototype - FR-16 & FR-20 Validation');
  console.log('=========================================================\n');
  
  runTest('BoE Court Minutes', BOE_COURT_MINUTES, 'Bank of England Court Minutes (28 Oct 2025)');
  runTest('HSBC Corporate Governance', HSBC_GOVERNANCE, 'HSBC Corporate Governance Report 2024');
  
  console.log('\n' + '='.repeat(80));
  console.log('PROTOTYPE TEST COMPLETE');
  console.log('='.repeat(80));
}

main();
