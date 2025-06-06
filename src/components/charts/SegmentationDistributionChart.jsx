import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import gstService from '../../services/gst.service';

const COLORS = {
  micro: '#FFD12CB2',
  small: '#4485E5',
  medium: '#FF779D',
  large: '#00E096'
};

function SegmentationDistributionChart({ startDate, endDate }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await gstService.getSegmentationDistribution(startDate, endDate);
        
        // Transform the data for the pie chart
        const chartData = Object.entries(response).map(([name, value]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          value: value
        }));
        
        setData(chartData);
        setError(null);
      } catch (err) {
        console.error('Error fetching segmentation distribution:', err);
        setError('Failed to load segmentation distribution data');
      } finally {
        setLoading(false);
      }
    };

    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  const options = {
    chart: {
      type: 'pie',
      height: 350,
      animations: {
        enabled: true
      },
      toolbar: {
        show: false
      }
    },
    labels: data.length > 0 ? data.map(item => item.name) : [],
    colors: data.length > 0 ? data.map(item => COLORS[item.name.toLowerCase()]) : [],
    legend: {
      position: 'bottom'
    },
    tooltip: {
      y: {
        formatter: (value) => value.toLocaleString()
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '0%'
        },
        dataLabels: {
          offset: -30
        }
      }
    },
    dataLabels: {
      formatter: (val, opts) => {
        const name = opts.w.globals.labels[opts.seriesIndex];
        const value = opts.w.globals.series[opts.seriesIndex];
        return `${name}: ${val.toFixed(0)}%`;
      }
    },
    noData: {
      text: 'No Data Found',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#6c757d',
        fontSize: '16px',
        fontFamily: 'inherit'
      }
    }
  };

  const series = data.length > 0 
    ? (data.every(item => item.value === 0) ? [] : data.map(item => item.value))
    : [];

  if (loading) {
    return (
      <Card className="chart-card">
        <Card.Body>
          <div className="text-center">Loading...</div>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="chart-card">
        <Card.Body>
          <div className="text-center text-danger">{error}</div>
        </Card.Body>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="chart-card">
        <Card.Body>
          <Card.Title>Segmentation Distribution</Card.Title>
          <div className="text-center text-muted" style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            No Data Found
          </div>
        </Card.Body>
      </Card>
    );
  }
{console.log(series)}
  return (
    <Card className="chart-card">
      <Card.Body>
        <Card.Title>Segmentation Distribution</Card.Title>
        <div style={{ width: '100%', height: 350 }}>
          <ReactApexChart
            options={options}
            series={series}
            type="pie"
            height={350}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default SegmentationDistributionChart; 