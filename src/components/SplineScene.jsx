import Spline from '@splinetool/react-spline';

const SplineScene = ({ onLoad }) => {
  return (
    <Spline
      scene="https://prod.spline.design/WOgawY6-UYtH6NHw/scene.splinecode"
      onLoad={onLoad}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default SplineScene;