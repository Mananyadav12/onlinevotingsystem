import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../helper';


const VoterbyAge = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ageGroupData, setAgeGroupData] = useState({});

  const groupVotersByAge = (voters) => {
    const ageGroups = {
      '18-25': 0,
      '26-35': 0,
      '36-45': 0,
      '46-55': 0,
      '56-65': 0,
      '66-75': 0,
      '76+': 0,
    };

    voters.forEach(voter => {
      if (voter.age >= 18 && voter.age <= 25) {
        ageGroups['18-25']++;
      } else if (voter.age >= 26 && voter.age <= 35) {
        ageGroups['26-35']++;
      } else if (voter.age >= 36 && voter.age <= 45) {
        ageGroups['36-45']++;
      } else if (voter.age >= 46 && voter.age <= 55) {
        ageGroups['46-55']++;
      } else if (voter.age >= 56 && voter.age <= 65) {
        ageGroups['56-65']++;
      } else if (voter.age >= 66 && voter.age <= 75) {
        ageGroups['66-75']++;
      } else if (voter.age >= 76) {
        ageGroups['76+']++;
      }
    });

    return Object.entries(ageGroups).map(([key, value]) => ({
      id: key,
      label: key,
      value: value,
    }));
  };
  useEffect(() => {
    const fetchVoterData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getVoter`); // Replace with your actual endpoint
        const voterData = response.data.voter;
        const groupedData = groupVotersByAge(voterData);
        setAgeGroupData(groupedData);
      } catch (err) {
        console.log("Error Fetching Data", err);
      }
    };

    fetchVoterData();
  }, []);
  return (
    ageGroupData.length > 0 && (
    <ResponsivePie
      data={ageGroupData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
    />)
    
  );
};

export default VoterbyAge;