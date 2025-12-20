import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Header from './Dashboard/BlurHeader';
import Footer from '@/Components/News/Footer';
import { useTranslation } from 'react-i18next';
import OperationCard from './Card-Afc';

import {
  TransfertAnimation,
  MintAnimation,
  ApprovalAnimation,
  TransferFromAnimation,
  AllowanceAnimation,
  PauseAnimation,
  WaitAnimation,
  FreezeAnimation,
  TransferAnimation,
  SnowAnimation,
  OlympicAnimation
} from '@/Components/animations/Loading';


export default function Afc() {
  const { t } = useTranslation();

  return (
    <AuthenticatedLayout

      header={
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-md">
            {t('afc.regards')}
          </h2>
        </div>
      }
    >
      <Head title={t('afc.title')} />

      <div className="">
        <Header title={t('afc.operations')} />

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          <OperationCard href="/mint" label={t('afc.mint')}>
            <MintAnimation />
          </OperationCard>

          <OperationCard href="/transfer" label={t('afc.transfer')}>
            <TransfertAnimation />
          </OperationCard>

          <OperationCard href="/approve" label={t('afc.approve')}>
            <ApprovalAnimation />
          </OperationCard>

          <OperationCard href="/transferFrom" label={t('afc.transferFrom')}>
            <TransferAnimation/>
          </OperationCard>

          <OperationCard href="/burn" label={t('afc.burn')}>
            <OlympicAnimation />
          </OperationCard>

          <OperationCard href="/allowance" label={t('afc.allowance')}>
            <ApprovalAnimation />
          </OperationCard>

          <OperationCard href="/pause" label={t('afc.pause')}>
            <FreezeAnimation />
          </OperationCard>

          <OperationCard href="/freeze" label={t('afc.freeze')}>
            <SnowAnimation/>
          </OperationCard>
        </div>


        <div className="mt-16">
          <Footer />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
