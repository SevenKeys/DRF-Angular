from django.contrib.auth import update_session_auth_hash

from rest_framework import serializers

from .models import Account

class AccountSerializer(serializers.ModelSerializer):
    # for user no need reenter password because required=False
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Account
        fields = ('id', 'username', 'first_name', 'last_name', 'email',
                  'tagline', 'password', 'confirm_password','created_at',
                  'updated_at')
        read_only_fields = ('created_at', 'updated_at')

    def create(self, validated_data):
        return Account.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username) 
        instance.tagline = validated_data.get('tagline', instance.tagline)
        
        instance.save()

        password = validated_data.get('password', None) 
        confirm_password = validated_data.get('confirm_password', None)

        if password and confirm_password and password == confirm_password:
            # set_password for security reasons
            instance.set_password(password)
            instance.save()
        # so user no need log in again after updating
        update_session_auth_hash(self.context.get('request'), instance)
        return instance
