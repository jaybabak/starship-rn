import React from 'react';
import { Alert, StyleSheet, Text, View} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userLocation: 'YOUR CURRENT LOCATION = ?',
      latitude: null,
      longitude: null,
      error: null,
      btnActive: 'black'
    };

    this._onPressButton = this._onPressButton.bind(this);

  }


  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  _onPressButton() {
    Alert.alert('Got Your Current Location')
    this.setState({
      userLocation: this.state.latitude + ':' + this.state.longitude
    });


      fetch('http://freegeoip.net/json/')
      .then(
        response => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json().then(data => {

            // this.setState({
            //   userip: data.ip,
            //   city: data.city.toLowerCase(),
            //   country: data.country_code.toLowerCase(),
            //   province: data.region_code.toLowerCase()
            // });
            //
            // var wQuery = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + this.state.city + '%2C%20' + this.state.province + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
            //
            // this.setState({
            //   query: wQuery,
            // });
          });
        }
      )


  }

  render() {
    return (
      <View style={styles.container}>
        <FontAwesome onPress={this._onPressButton} style={styles.hero} name="compass" size={128} color="black" />
        <Text style={styles.subheading}>{this.state.userLocation}</Text>
        <Text style={styles.info}>Click the compass to find the current weather!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    color: 'orange',
    marginTop: 20
  },
  subheading: {
    fontSize: 15,
    color: 'orange',
    marginTop: 50
  },
  info: {
    color: '#e2e2e2',
    marginTop: 10
  },
  active: {
    color: 'black',
    marginTop: 10
  },
});
