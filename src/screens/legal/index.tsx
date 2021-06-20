import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { observer } from 'mobx-react';
import { AppBars, Text } from '@/components';
import { useStyleLegal } from './styles';

export const Legal = observer(() => {
  const styles = useStyleLegal();
  return (
    <>
      <AppBars title="Legal" />
      <ScrollView>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat
          dictum eleifend. Phasellus sed faucibus felis. Nulla vel ipsum
          facilisis, ultrices tortor quis, condimentum diam. Sed eu nulla ac
          turpis facilisis consequat. Cras ultrices neque quis sem interdum, ac
          varius turpis interdum. Ut sem lectus, fermentum at est nec, imperdiet
          malesuada ex. Sed eget odio et nisl molestie bibendum at et felis.
          Quisque ligula sem, tincidunt at turpis id, pharetra imperdiet metus.
          Sed non bibendum dolor. Cras porttitor, tortor eu molestie volutpat,
          dolor sapien maximus quam, vel consectetur metus ex vitae nibh. Donec
          vitae risus bibendum, volutpat purus eu, elementum ipsum. Duis in
          vulputate nibh. Nulla dictum magna lectus, vitae semper purus
          vestibulum ac. Morbi imperdiet sem diam, ac iaculis ipsum laoreet
          vitae. Aliquam sit amet mauris egestas, facilisis ex ut, pellentesque
          velit. Donec rhoncus a purus nec egestas. Integer nunc sapien, dapibus
          vel tincidunt vitae, feugiat id augue. Aenean vitae quam sapien. Morbi
          ultricies arcu in massa finibus bibendum. In hac habitasse platea
          dictumst.
        </Text>
        <Text style={styles.text}>
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. In porta lorem vel faucibus accumsan. Vivamus
          sem nisi, ultrices nec euismod nec, mollis id nisl. Donec commodo nunc
          vehicula aliquet rutrum. Donec at fermentum felis. Phasellus tincidunt
          eu tortor in pulvinar. Maecenas in sollicitudin dolor. Nunc vitae
          ullamcorper sapien. Maecenas tempor, felis semper auctor pellentesque,
          tellus nunc sollicitudin neque, eu placerat elit massa quis sapien.
          Mauris mauris lacus, eleifend et ultrices efficitur, laoreet id
          libero. libero. Curabitur volutpat malesuada turpis, quis scelerisque
          purus tincidunt sit amet. Curabitur ut odio nisl.
        </Text>
      </ScrollView>
    </>
  );
});
