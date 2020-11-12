import React from 'react';
import { PNG, Diagram, GeneralIcon } from 'rediagram';
import { GCP, InvizGCP, ComputeEngine, OptionalComponent, TitleBar } from '@rediagram/gcp';

PNG(
  <Diagram title={<TitleBar width={800}>High Performance Computing</TitleBar>}>
    <InvizGCP>
      <GeneralIcon name="iOS/Android/Web" type="Mobile client" upstream={['HPC Head Node']} />
      <GCP>
        <ComputeEngine name="HPC Head Node" upstream={['Compute Node']} />
        <ComputeEngine name="Compute Node" upstream={['File System']} description="Multiple Instances" />
        <OptionalComponent title="Optional File System">
          <ComputeEngine name="File System" description="Multiple Instances" />
        </OptionalComponent>
      </GCP>
    </InvizGCP>
  </Diagram>,
);
