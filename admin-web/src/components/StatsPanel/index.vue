<template>
  <div class="stats-panel">
    <h3 class="panel-title">
      <el-icon :size="16"><DataAnalysis /></el-icon>
      数据概览
    </h3>

    <!-- Stat cards -->
    <div class="stat-cards">
      <div class="stat-card">
        <div class="stat-card-icon sessions-icon">
          <el-icon :size="20"><ChatDotRound /></el-icon>
        </div>
        <div class="stat-card-info">
          <span class="stat-card-value">{{ todaySessions }}</span>
          <span class="stat-card-label">今日会话</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon ai-icon">
          <el-icon :size="20"><Cpu /></el-icon>
        </div>
        <div class="stat-card-info">
          <span class="stat-card-value">{{ aiReplyRate }}%</span>
          <span class="stat-card-label">AI 回复占比</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon online-icon">
          <el-icon :size="20"><User /></el-icon>
        </div>
        <div class="stat-card-info">
          <span class="stat-card-value">{{ onlineAgents }}</span>
          <span class="stat-card-label">在线客服</span>
        </div>
      </div>
    </div>

    <!-- Chart: Session trend -->
    <div class="chart-section">
      <h4 class="section-title">会话趋势</h4>
      <div ref="trendChartRef" class="chart-container"></div>
    </div>

    <!-- Chart: AI vs Human -->
    <div class="chart-section">
      <h4 class="section-title">回复类型分布</h4>
      <div ref="pieChartRef" class="chart-container"></div>
    </div>

    <!-- Quick stats -->
    <div class="quick-stats">
      <div class="quick-stat-item">
        <span class="quick-stat-dot avg"></span>
        <span class="quick-stat-label">平均响应时间</span>
        <span class="quick-stat-value">1.2s</span>
      </div>
      <div class="quick-stat-item">
        <span class="quick-stat-dot satisfaction"></span>
        <span class="quick-stat-label">满意度</span>
        <span class="quick-stat-value">96.8%</span>
      </div>
      <div class="quick-stat-item">
        <span class="quick-stat-dot resolve"></span>
        <span class="quick-stat-label">解决率</span>
        <span class="quick-stat-value">89.2%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { DataAnalysis, ChatDotRound, Cpu, User } from '@element-plus/icons-vue';
import * as echarts from 'echarts';
import { useChatStore } from '@/stores/chat';

const chatStore = useChatStore();

const trendChartRef = ref<HTMLElement | null>(null);
const pieChartRef = ref<HTMLElement | null>(null);
let trendChart: echarts.ECharts | null = null;
let pieChart: echarts.ECharts | null = null;

const todaySessions = ref(156);
const aiReplyRate = ref(72);
const onlineAgents = ref(8);

onMounted(() => {
  initTrendChart();
  initPieChart();

  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  trendChart?.dispose();
  pieChart?.dispose();
  window.removeEventListener('resize', handleResize);
});

function handleResize() {
  trendChart?.resize();
  pieChart?.resize();
}

function initTrendChart() {
  if (!trendChartRef.value) return;
  trendChart = echarts.init(trendChartRef.value);

  const hours = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);
  const data = [5, 8, 12, 18, 25, 22, 30, 28, 20, 15, 10, 8];

  trendChart.setOption({
    grid: {
      top: 10,
      right: 10,
      bottom: 24,
      left: 36,
    },
    xAxis: {
      type: 'category',
      data: hours,
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
      axisLabel: { color: '#5e6280', fontSize: 10 },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: '#5e6280', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.04)' } },
    },
    series: [
      {
        type: 'line',
        data,
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        lineStyle: {
          color: '#6c7aff',
          width: 2,
        },
        itemStyle: {
          color: '#6c7aff',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(108, 122, 255, 0.3)' },
            { offset: 1, color: 'rgba(108, 122, 255, 0.02)' },
          ]),
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e2030',
      borderColor: 'rgba(255,255,255,0.08)',
      textStyle: { color: '#e4e6f0', fontSize: 12 },
    },
  });
}

function initPieChart() {
  if (!pieChartRef.value) return;
  pieChart = echarts.init(pieChartRef.value);

  pieChart.setOption({
    series: [
      {
        type: 'pie',
        radius: ['42%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#161822',
          borderWidth: 2,
        },
        label: {
          color: '#9499b3',
          fontSize: 11,
        },
        data: [
          {
            value: 72,
            name: 'AI 回复',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                { offset: 0, color: '#6c7aff' },
                { offset: 1, color: '#8b5cf6' },
              ]),
            },
          },
          {
            value: 28,
            name: '人工回复',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                { offset: 0, color: '#36d6a8' },
                { offset: 1, color: '#2ecc71' },
              ]),
            },
          },
        ],
      },
    ],
    tooltip: {
      trigger: 'item',
      backgroundColor: '#1e2030',
      borderColor: 'rgba(255,255,255,0.08)',
      textStyle: { color: '#e4e6f0', fontSize: 12 },
      formatter: '{b}: {c}%',
    },
  });
}
</script>

<style scoped lang="scss">
@use '@/styles/theme' as *;

.stats-panel {
  width: 280px;
  min-width: 280px;
  height: 100%;
  background-color: $bg-secondary;
  border-left: 1px solid $border-color;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow-y: auto;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: $text-primary;
}

.stat-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background-color: $bg-card;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  transition: all $transition-fast;

  &:hover {
    border-color: rgba($accent-primary, 0.2);
    transform: translateY(-1px);
    box-shadow: $shadow-sm;
  }
}

.stat-card-icon {
  width: 40px;
  height: 40px;
  border-radius: $radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  &.sessions-icon {
    background: linear-gradient(135deg, #6c7aff, #8b5cf6);
  }

  &.ai-icon {
    background: linear-gradient(135deg, #36d6a8, #2ecc71);
  }

  &.online-icon {
    background: linear-gradient(135deg, #f5a623, #e67e22);
  }
}

.stat-card-info {
  display: flex;
  flex-direction: column;
}

.stat-card-value {
  font-size: 20px;
  font-weight: 700;
  color: $text-primary;
  line-height: 1.2;
}

.stat-card-label {
  font-size: 11px;
  color: $text-secondary;
}

.chart-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-title {
  font-size: 12px;
  font-weight: 500;
  color: $text-secondary;
}

.chart-container {
  width: 100%;
  height: 160px;
  background-color: $bg-card;
  border: 1px solid $border-color;
  border-radius: $radius-md;
}

.quick-stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 4px;
}

.quick-stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.quick-stat-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;

  &.avg {
    background-color: $accent-primary;
  }

  &.satisfaction {
    background-color: $accent-secondary;
  }

  &.resolve {
    background-color: $accent-warning;
  }
}

.quick-stat-label {
  flex: 1;
  color: $text-secondary;
}

.quick-stat-value {
  font-weight: 600;
  color: $text-primary;
}
</style>
