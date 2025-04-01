'use client';

import React from 'react';
import { ReactFlow } from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import { BaseNode } from '@/components/base-node';

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
   

export default function FlowPage() {

    return (
        <div className="w-screen h-screen p-8">
          <BaseNode selected={false}>Hi! 👋</BaseNode>
        </div>
      );
}