import type { Schema, Struct } from '@strapi/strapi';

export interface AgricultureGrowingConditions extends Struct.ComponentSchema {
  collectionName: 'components_agriculture_growing_conditions';
  info: {
    displayName: 'Growing Conditions';
    icon: 'seed';
  };
  attributes: {
    humidity_max: Schema.Attribute.Integer;
    humidity_min: Schema.Attribute.Integer;
    light_hours: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 24;
          min: 0;
        },
        number
      >;
    ph_max: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 14;
          min: 0;
        },
        number
      >;
    ph_min: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 14;
          min: 0;
        },
        number
      >;
    temperature_max: Schema.Attribute.Integer;
    temperature_min: Schema.Attribute.Integer;
  };
}

export interface SharedDimensions extends Struct.ComponentSchema {
  collectionName: 'components_shared_dimensions';
  info: {
    displayName: 'Dimensions';
  };
  attributes: {
    height: Schema.Attribute.Decimal;
    length: Schema.Attribute.Decimal;
    unit: Schema.Attribute.Enumeration<['cm', 'm', 'mm']>;
    weight: Schema.Attribute.Decimal;
    width: Schema.Attribute.Decimal;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    keywords: Schema.Attribute.String;
    meta_description: Schema.Attribute.Text;
    meta_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    meta_title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface TechnologyAiFeatures extends Struct.ComponentSchema {
  collectionName: 'components_technology_ai_features';
  info: {
    displayName: 'AI Features';
    icon: 'database';
  };
  attributes: {
    bidirectional: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    ensemble_models: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    features: Schema.Attribute.JSON;
    model_type: Schema.Attribute.Enumeration<
      ['LSTM', 'GRU', 'CNN', 'Ensemble']
    >;
    training_accuracy: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<68>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'agriculture.growing-conditions': AgricultureGrowingConditions;
      'shared.dimensions': SharedDimensions;
      'shared.seo': SharedSeo;
      'technology.ai-features': TechnologyAiFeatures;
    }
  }
}
