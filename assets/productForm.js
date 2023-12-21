import { createApp, ref, onMounted, computed, provide, inject } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js' 
    import store from '../assets/store.js'

    const productForm = createApp({
    delimiters: ['${', '}'],
      setup() {
        const store = inject("store");
        const product = ref({});
        const productUrl = store.url.pathname + '.js';
        const selectedVariations = ref([]);
        const selectedOrFirstVariant = ref({
          id: null,
          price: null,
          comparePrice: null,
          quantity: null,
        });

        onMounted(() => {
          fetch(productUrl)
            .then(response => response.json())
            .then((response) => {
              product.value = response
              setVariationsOnMount();
          });
        })

        //! TODO: no need to hold the same state in 3 different instances. Just move to selectedOrFirstVariant being it is loaded onMount
        const mapVariations = computed(() => {
          let map = [];
          selectedVariations.value.forEach(variation => {
            map.push(variation.name);
          });
          return map;
        });
        
        function handleSelectedVariations(option, value) {
          selectedVariations.value.some(item => item.option === option)
            ? selectedVariations.value.forEach(item => item.option === option && (item.name = value))
            : selectedVariations.value.push({ option: option, name: value });

          if(selectedVariations.value.length === product.value.options.length) {
              findMatchedVariation();  
              store.setQueryParam('variant', selectedOrFirstVariant.value.id);
          }
        }

        function findMatchedVariation() {
          const productVariation = product.value.variants.find(value => selectedVariations.value.every(val => value.options.includes(val.name)));
            selectedOrFirstVariant.value = {
              id: productVariation.id,
              price: productVariation.price,
              comparePrice: productVariation.compare_at_price,
              quantity: selectedOrFirstVariant.value.quantity
          };
        }
        // for that page refresh
        function setVariationsOnMount() {
          const previousId = store.getQueryParam('variant');
          if(previousId != null) {
            const previousSelection = product.value.variants.find(variant => variant.id == previousId);

            selectedOrFirstVariant.value = {
              id: previousSelection.id,
              price: previousSelection.price,
              comparePrice: previousSelection.compare_at_price,
              quantity: 1
            };

            product.value.options.forEach((opt, index) =>  selectedVariations.value.push({ option: opt.name, name: previousSelection.options[index] }));
          }else {
            selectedOrFirstVariant.value = {
              id: null,
              price: product.value.price,
              comparePrice: product.value.compare_at_price,
              quantity: 1 
            }
          }
        }
        
        return {
          product,
          store,
          selectedVariations,
          handleSelectedVariations,
          mapVariations,
          selectedOrFirstVariant,
        }
      }

     });
     productForm.provide('store', store);
    productForm.mount('#productForm');